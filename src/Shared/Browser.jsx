import React from "react";
import PropTypes from "prop-types";

import pick from "lodash/pick";

import { Flex, Box } from "@rebass/grid";

import Filter from "./Filter";
import List from "./List";

import Scroll from "Shared/Scroll";

import useIndex from "_hooks/useIndex";

export const Primitive = props => (
  <Flex flexDirection="column" style={{ height: "100%" }}>
    <Flex p={2}>
      <Filter onSubmit={props.handleFilter} />
    </Flex>
    <Scroll bottom={props.loadMore}>
      <List
        items={props.items || []}
        renderItem={props.renderItem}
        renderEmpty={
          props.hasError || props.isLoading ? () => null : props.renderEmpty
        }
      />
      {props.isLoading && <Box p={2}>loading</Box>}
      {props.hasError && (
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={2}
        >
          <b>There was an Error</b>
          <p>Try again</p>
        </Flex>
      )}
    </Scroll>
  </Flex>
);

Primitive.propTypes = {
  items: PropTypes.array,
  renderItem: PropTypes.func.isRequired,
  renderEmpty: PropTypes.func,
  handleFilter: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
  loadMore: PropTypes.func
};

Primitive.defaultProps = {
  renderEmpty: () => "no items available",
  filterData: {},
  isLoading: false,
  hasError: false
};

export const Container = props => {
  const { items, hasError, isLoading, filter, more } = useIndex(props.getItems);
  const newProps = {
    handleFilter: filter,
    items,
    isLoading,
    hasError,
    loadMore: isLoading ? null : more,
    ...pick(props, ["renderItem", "renderEmpty"])
  };

  return <Primitive {...newProps} />;
};

Container.propTypes = {
  getItems: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  renderEmpty: PropTypes.func,
  itemsPerPage: PropTypes.number
};

Container.defaultProps = {
  itemsPerPage: 20
};

export default Container;
