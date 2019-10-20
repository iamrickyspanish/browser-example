import { useCallback, useMemo } from "react";

import debounce from "lodash/debounce";

export const useScrollEvents = ({ bottom, top, offset = 300 }) => {
  const debounced = useMemo(
    () => ({
      top:
        typeof top === "function"
          ? debounce(top, 500, { trailing: false, leading: true })
          : null,
      bottom:
        typeof bottom === "function"
          ? debounce(bottom, 500, { trailing: false, leading: true })
          : null
    }),
    [top, bottom]
  );

  return useCallback(
    e => {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const hasReachedBottom =
        scrollHeight - offset - scrollTop <= clientHeight;
      const hasReachedTop = scrollTop === 0;
      hasReachedBottom && console.log("hasReachedBottom");
      hasReachedBottom &&
        typeof debounced.bottom === "function" &&
        debounced.bottom(e);
      hasReachedTop && typeof debounced.top === "function" && debounced.top(e);
    },
    [debounced, offset]
  );
};
export default useScrollEvents;
