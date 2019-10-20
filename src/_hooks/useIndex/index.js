import { useReducer, useEffect, useCallback } from "react";

import usePromise from "react-use-promise";

import indexReducer, {
  initialState,
  requestItems,
  receiveItems,
  receiveError,
  filterItems,
  loadMoreItems
} from "./duck";

export const useIndex = getItems => {
  const [state, dispatch] = useReducer(indexReducer, initialState);

  const { queryData, isLoading, items, hasError } = state;

  const [receivedItems, error, promiseState] = usePromise(() => {
    return getItems(queryData);
  }, [getItems, queryData]);

  useEffect(() => {
    switch (promiseState) {
      case "resolved":
        if (Array.isArray(receivedItems)) dispatch(receiveItems(receivedItems));
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
  }, [promiseState, dispatch, receivedItems]);

  const filter = useCallback(filterData => dispatch(filterItems(filterData)), [
    dispatch
  ]);

  const more = useCallback(() => !isLoading && dispatch(loadMoreItems()), [
    dispatch,
    isLoading
  ]);

  return { items, hasError, isLoading, filter, more };
};

export default useIndex;
