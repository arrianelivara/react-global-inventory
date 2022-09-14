import { useState, useCallback, useMemo } from "react";
import { useRouter } from "hooks";
import useMount from "./useMount";
import { checkIfObjectValuesAreEqual } from "services";
import * as moment from "moment";

/**
 * A hook for easier handling / processing of Table filter logic
 */
const useFilter = (initialState = undefined, defaultState = {}) => {
  const { location } = useRouter();
  const { state: locationState } = location || {};

  const [filterState, setFilterState] = useState({ ...initialState, locationState });

  const [requestState, setRequestState] = useState(
    convertFilterStateToRequest({ ...initialState, locationState })
  );

  // const [isFilterDirty, setIsFilterDirty] = useState(
  //   !checkIfObjectValuesAreEqual(initialState, filterState)
  // );

  // Filter Hook usage validation
  useMount(() => {
    validateFilterState(initialState);
  });

  const isFilterDirty = useMemo(() => {
    return !checkIfObjectValuesAreEqual(initialState, filterState);
  }, [filterState, initialState]);

  // const isFilterApplied = useMemo(() => {
  //   if (!locationState) {
  //     return false;
  //   }
  //   return !checkIfObjectValuesAreEqual(initialState, locationState);
  // }, [locationState, initialState]);

  const modifyFilters = useCallback(
    (filters) => {
      // setIsFilterDirty(true);
      const newFilters = {
        ...filterState,
        ...removeUninitializedFilters(filters, initialState),
      };

      if (validateFilters(newFilters)) {
        setFilterState(newFilters);

        const newRequestFilters = convertFilterStateToRequest(newFilters);
        setRequestState(newRequestFilters);
        return { filterState: newFilters, requestState: newRequestFilters };
      }
      return { filterState: newFilters, requestState: null };
    },
    [filterState, initialState]
  );

  const modifyFilter = useCallback(
    (name, obj) => {
      return modifyFilters({ [name]: obj.value });
    },
    [modifyFilters]
  );

  const clearFilter = useCallback(() => {
    // setIsFilterDirty(false);
    const is = initialState;
    if (Object.keys(defaultState).length) {
      Object.keys(defaultState).forEach((key) => {
        if (is.hasOwnProperty(key)) {
          is[key] = defaultState[key];
        }
      });
    }
    if (is.dateRange) {
      is.dateRange = [moment().startOf("day"), moment().endOf("day")];
    }
    setFilterState(is);

    const newRequestFilters = convertFilterStateToRequest(is);
    setRequestState(newRequestFilters);
    return { filterState: initialState, requestState: newRequestFilters };
  }, [initialState, defaultState]);

  return { modifyFilter, modifyFilters, clearFilter, filterState, requestState, isFilterDirty };
};

// Add additional validations here in the future if any
const validateFilters = (filterState) => {
  try {
    validateFilterState(filterState);
    validatePaginationState(filterState);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const validateFilterState = (filterState) => {
  if (!filterState) {
    throw new Error("Filter state is required when using filter hook");
  }
  if (typeof filterState !== "object") {
    throw new Error("Filter state must be an object");
  }
  if (Object.keys(filterState) <= 0) {
    throw new Error("Filter state must have atleast one property");
  }
};

const validatePaginationState = (state) => {
  if (state.hasOwnProperty("page") || state.hasOwnProperty("pageSize")) {
    if (!state?.page || typeof state?.page !== "number" || state?.page <= 0) {
      throw new Error(`Invalid page state with value ${state.page}`);
    }
    if (!state?.pageSize || typeof state?.pageSize !== "number" || state?.pageSize <= 0) {
      throw new Error(`Invalid page size state with value of ${state.pageSize}`);
    }
  }

  return true;
};

const removeUninitializedFilters = (filters, initialState) => {
  let newFilters = {};
  for (const [k, filter] of Object.entries(filters)) {
    if (!initialState.hasOwnProperty(k)) {
      console.warn(
        `Filter ${k} is not declared on initial filter state. Will disregard this filter.`
      );
    } else {
      newFilters[k] = filter;
    }
  }
  return newFilters;
};

const convertFilterStateToRequest = (filterState) => {
  let request = {};
  for (const [k, filter] of Object.entries(filterState)) {
    if (filter !== null && filter !== undefined && filter !== "") {
      request[k] = filter;
    }
    // if (filter !== Common.ALL) {
    //   request[k] = filter;
    // }
  }
  return request;
};

export default useFilter;
