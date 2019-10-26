import React from "react";
import PropTypes from "prop-types";

import { Flex } from "@rebass/grid";

export const Primitive = props => (
  <Flex flexDirection="column">
    {props.items.length === 0 &&
      typeof props.renderEmpty === "function" &&
      props.renderEmpty()}
    {props.items.map(props.renderItem)}
  </Flex>
);

Primitive.propTypes = {
  items: PropTypes.array,
  renderItem: PropTypes.func.isRequired,
  renderEmpty: PropTypes.func
};

Primitive.defaultProps = {
  items: [],
  renderEmpty: null
};

export default Primitive;
