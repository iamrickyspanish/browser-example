import { useMemo } from "react";

import usePromise from "react-use-promise";

import isEmpty from "lodash/isEmpty";

const defaultOptions = {
  initialItemData: {}
};

export const useItem = (getItemFn, _options = {}) => {
  const { initialItemData } = useMemo(
    () => ({
      ...defaultOptions,
      ..._options
    }),
    [_options]
  );

  const [itemData, error, state] = usePromise(() => {
    return isEmpty(initialItemData)
      ? getItemFn()
      : Promise.resolve(initialItemData);
  }, [initialItemData, getItemFn]);

  const isLoading = useMemo(() => state === "pending", [state]);

  return [itemData, isLoading, error];
};

export default useItem;
