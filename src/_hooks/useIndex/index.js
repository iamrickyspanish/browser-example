import { useReducer, useEffect, useCallback, useMemo } from "react";

import usePromise from "react-use-promise";

import useIsFirstRender from "_hooks/useIsFirstRender";

import identity from "lodash/identity";
import isEmpty from "lodash/isEmpty";

import indexReducer, {
  initialState,
  requestItems,
  receiveItems,
  receiveError,
  filterItems,
  receiveTotalCount,
  loadMoreItems
} from "./duck";

const defaultOptions = {
  limit: 20,
  offset: 0,
  mapQueryData: identity,
  mapResponseToItems: identity,
  mapResponseToTotalCount: null,
  fetchOnMount: true
};

export const useIndex = (getItems, _options = {}) => {
  const [state, dispatch] = useReducer(indexReducer, initialState);

  const options = useMemo(
    () => ({
      ...defaultOptions,
      ..._options
    }),
    [_options]
  );

  const { queryData, isLoading, items, hasError, totalCount } = state;

  const { fetchOnMount, mapResponseToItems, mapResponseToTotalCount } = options;

  const filter = useCallback(filterData => dispatch(filterItems(filterData)), [
    dispatch
  ]);

  const more = useCallback(() => !isLoading && dispatch(loadMoreItems()), [
    dispatch,
    isLoading
  ]);

  const isFirstRender = useIsFirstRender();

  const [response, error, promiseState] = usePromise(() => {
    return isEmpty(queryData)
      ? Promise.resolve([])
      : getItems(options.mapQueryData(queryData));
  }, [getItems, queryData]);

  useEffect(() => {
    if (isFirstRender && fetchOnMount) {
      filter({});
    }
  }, [filter, isFirstRender, fetchOnMount]);

  useEffect(() => {
    switch (promiseState) {
      case "resolved":
        dispatch(receiveItems(mapResponseToItems(response)));
        if (typeof mapResponseToTotalCount === "function") {
          dispatch(receiveTotalCount(mapResponseToTotalCount(response)));
        }
        break;
      case "rejected":
        dispatch(receiveError());
        break;
      case "pending":
        dispatch(requestItems());
        break;
      default:
        return;
    }
  }, [
    promiseState,
    dispatch,
    response,
    mapResponseToItems,
    mapResponseToTotalCount
  ]);

  return { items, hasError, isLoading, filter, more, error, totalCount };
};

export default useIndex;
