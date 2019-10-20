import React from "react";
import PropTypes from "prop-types";

import { Flex } from "@rebass/grid";

export const Primitive = props => (
  <div>
    {props.items.length === 0 && props.renderEmpty()}
    {props.items.map(item => props.renderItem(item))}
  </div>
);

Primitive.propTypes = {
  items: PropTypes.array,
  renderItem: PropTypes.func.isRequired,
  renderEmpty: PropTypes.func.isRequired
};

Primitive.defaultProps = {
  items: []
};

export default Primitive;
