import { useContext, useCallback, useState } from "react";
import { AppContext } from "contexts";
import { getErrorMessage } from "errors";
import { removeLocalItem } from "utils";

const useApis = ({ apis = [], handleOwnError = false }) => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const { dispatch } = useContext(AppContext);
  const [error, setError] = useState(false);

  const request = useCallback(
    async (params) => {
      setLoading(true);
      try {
        const requests = apis.map((api, i) => {
          if (params && params[i]) {
            return api(params[i]);
          } else {
            return api();
          }
        });
        const res = await Promise.all(requests);
        setResults(res);
        setLoading(false);
        return res;
      } catch (err) {
        const metadata = err?.metadata;
        const code = metadata?.code;
        if (code) {
          err.message = getErrorMessage(code);
        }
        setError(true);
        setLoading(false);

        const getErrorResponse = (type, defaultError) => {
          if (handleOwnError && handleOwnError[type]) {
            if (typeof handleOwnError[type] === "function") {
              handleOwnError[type]();
            } else {
              throw err;
            }
          } else {
            defaultError();
          }
        };
        console.log(err);
        switch (err.error) {
          case "network":
            getErrorResponse("network", () => dispatch({ type: "NETWORK_ERROR" }));
            // if (handleOwnError?.network) {
            //   handleOwnError.network(err);
            // } else {
            //   dispatch({ type: "NETWORK_ERROR" });
            // }
            throw err;
          case "unauthorized":
            getErrorResponse("unauthorized", () => {
              if (code === "9998") {
                dispatch({ type: "UNAUTHORIZED_ERROR", redirectLink: "/profile" });
              } else {
                removeLocalItem("accessToken");
                dispatch({ type: "UNAUTHORIZED_ERROR", redirectLink: "/" });
              }
            });
            // if (handleOwnError?.unauthorized) {
            //   handleOwnError.network(err);
            // } else {
            // removeLocalItem("accessToken");
            // dispatch({ type: "UNAUTHORIZED_ERROR" });
            // }
            throw err;
          case "server":
            getErrorResponse("server", () => dispatch({ type: "SERVER_ERROR" }));
            // if (handleOwnError?.server) {
            //   handleOwnError.network(err);
            // } else {
            //   dispatch({ type: "SERVER_ERROR" });
            // }
            throw err;
          case "badrequest":
            if (code === "8003") {
              dispatch({ type: "UNAUTHORIZED_ERROR", redirectLink: "/profile" });
            } else {
              if (code && handleOwnError?.code && handleOwnError?.code[code]) {
                handleOwnError.code[code](err);
              } else if (handleOwnError?.badrequest) {
                throw err;
              } else {
                dispatch({ type: "NETWORK_ERROR" });
              }
            }
            throw err;
          default:
            dispatch({ type: "NETWORK_ERROR" });
            throw err;
        }
      }
    },
    [apis, dispatch, handleOwnError]
  );

  return { request, loading, results, error };
};

export default useApis;
