import { AppContext } from "contexts/index";
import { useCallback, useContext, useState } from "react";
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
  const { globalErrorModal, setGlobalError } = useContext(AppContext);

  const mapData = useCallback(
    (res, params) => {
      let obj = null;
      if (isArray) {
        obj = mapObjects(res.data ? [...res.data] : [...res], mapper, { ...params });
      } else {
        if (res.data) {
          obj = mapObject({ ...res.data }, mapper, { ...params });
        } else {
          obj = mapObject({ ...res }, mapper, { ...params });
        }
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
      setGlobalError(false);
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
          globalErrorModal.show();
        };

        err.handleError = () => {
          showErrorAppState();
        };

        if (pageError) {
          setGlobalError(true);
          throw err;
        }

        const obj = {
          gateway: () => {
            setGlobalError(true);
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
            globalErrorModal.show();
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
      globalErrorModal,
      setGlobalError
    ]
  );

  return { request, loading, result, error, mappedData, submittedParams };
};

export default useApi;
