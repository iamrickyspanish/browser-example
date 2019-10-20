import React from "react";
import PropTypes from "prop-types";

import { Box } from "@rebass/grid";

import useScrollEvents from "_hooks/useScrollEvents";

export const Scroll = props => {
  const handleScroll = useScrollEvents(props);

  return (
    <Box
      flex={1}
      onScroll={handleScroll}
      style={{ overflow: props.disabled ? "hidden" : "auto", height: "100%" }}
    >
      {props.children}
    </Box>
  );
};

Scroll.propTypes = {
  top: PropTypes.func,
  bottom: PropTypes.func,
  disabled: PropTypes.bool
};

Scroll.defaultProps = {
  disabled: false
};

export default Scroll;
