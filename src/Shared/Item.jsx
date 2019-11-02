import useItem from "_hooks/useItem";
import { useMemo } from "react";

import PropTypes from "prop-types";

const Item = props => {
  const {
    initialItemData,
    renderPlaceholder,
    renderItem,
    renderError,
    getItem
  } = props;

  const [itemData, isLoading, error] = useItem(getItem, {
    initialItemData
  });

  const [renderFn, arg] = useMemo(() => {
    if (isLoading && typeof renderPlaceholder === "function") {
      return [renderPlaceholder];
    } else if (error && typeof renderError === "function") {
      return [renderError, error];
    } else {
      return [renderItem, itemData];
    }
  }, [isLoading, renderPlaceholder, renderItem, renderError, error, itemData]);

  return renderFn(...(arg ? [arg, props] : [props]));
};

Item.propTypes = {
  // navigateToItem: PropTypes.func,
  getItem: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  renderPlaceholder: PropTypes.func,
  renderError: PropTypes.func
};

Item.defaultProps = {
  // navigateToItem: null,
  renderPlaceholder: null,
  renderError: null
};

export default Item;
