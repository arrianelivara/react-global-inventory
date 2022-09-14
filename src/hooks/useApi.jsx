import { useCallback, useState } from "react";
import { mapObject, mapObjects } from "services";

const useApi = ({
  api,
  params = {},
  handleOwnError = false,
  mapper,
  isArray = false,
  paramsMapper,
  returnMappedData = false,
  pageError = false,
}) => {
  const [loading, setLoading] = useState(undefined);
  const [error, setError] = useState(false);
  const [result, setResult] = useState(undefined);
  const [mappedData, setMappedData] = useState(isArray ? [] : {});
  const [submittedParams, setSubmittedParams] = useState({});

  const mapData = useCallback(
    (res, params) => {
      let obj = null;
      if (isArray) {
        obj = mapObjects([...res.data], mapper, { ...params });
      } else {
        obj = mapObject({ ...res.data }, mapper, { ...params });
      }
      setMappedData(obj);
      return obj;
    },
    [mapper, isArray]
  );

  const request = useCallback(
    async (p) => {
      setLoading(true);
      setError(false);
      try {
        setSubmittedParams({ ...params, ...p });
        const parameter = paramsMapper
          ? mapObject({ ...params, ...p }, paramsMapper)
          : { ...params, ...p };
        const res = await api(parameter);
        setResult(res);
        setLoading(false);
        if (res) {
          const mappedDataResponse = mapData(res, parameter);
          if (returnMappedData) {
            return mappedDataResponse;
          }
        }
        return res;
      } catch (err) {
        console.error("API ERROR", err);
        const metadata = err?.metadata;
        const code = metadata?.code;
        err.code = code;

        setError(true);
        setLoading(false);

        const getErrorResponse = (type, defaultError) => {
          if (
            (handleOwnError && handleOwnError[type]) ||
            (typeof handleOwnError === "boolean" && handleOwnError)
          ) {
            if (handleOwnError[type] && typeof handleOwnError[type] === "function") {
              handleOwnError[type]();
            } else {
              throw err;
            }
          } else {
            defaultError();
          }
        };

        const showErrorAppState = () => {
          console.log("error");
        };

        err.handleError = () => {
          showErrorAppState();
        };

        if (pageError) {
          throw err;
        }

        const obj = {
          gateway: () => {
            throw err;
          },
          network: () => {
            getErrorResponse("network", () => showErrorAppState());
            throw err;
          },
          unauthorized: () => {
            if (handleOwnError?.unauthorized) {
              const handler = handleOwnError.unauthorized;

              if (code && typeof handler === "object" && handler.hasOwnProperty(code)) {
                handler[code]();
              } else {
                showErrorAppState();
              }
            } else {
              showErrorAppState();
            }
            throw err;
          },
          server: () => {
            getErrorResponse("server", () => showErrorAppState());
            throw err;
          },
          badrequest: () => {
            
            throw err;
          },
        };

        if (obj.hasOwnProperty(err.error)) {
          obj[err.error]();
        } else {
          showErrorAppState();
          throw err;
        }
      }
    },
    [
      params,
      api,
      handleOwnError,
      paramsMapper,
      mapData,
      returnMappedData,
      pageError,
    ]
  );

  return { request, loading, result, error, mappedData, submittedParams };
};

export default useApi;
