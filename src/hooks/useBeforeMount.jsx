import { useMemo } from "react";

/**
 * A hook that runs one time only before render
 */
const useBeforeMount = (callback) => {
  useMemo(() => {
    callback();
    //eslint-disable-next-line
  }, [callback]);
};

export default useBeforeMount;
