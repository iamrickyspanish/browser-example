import React, { useMemo } from "react";
import PropTypes from "prop-types";

import { Flex } from "@rebass/grid";

import Filter from "./Filter";
import List from "./List";

import Scroll from "Shared/Scroll";

import useIndex from "_hooks/useIndex";

//////////////// primitive

export const Primitive = props => (
  <Flex flexDirection="column" style={{ height: "100%" }}>
    <Flex p={2}>
      <Filter onSubmit={props.handleFilter} />
    </Flex>
    <Scroll
      disabled={props.isLoading && props.items.length === 0}
      bottom={props.loadMore}
    >
      <List items={props.items} renderItem={props.renderItem} />
      {props.isLoading && (
        <List
          items={props.placeholderItems}
          renderItem={(item, i) =>
            React.cloneElement(item, { key: `iph_${i}` })
          }
        />
      )}
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
  loadMore: PropTypes.func,
  placeholderItems: PropTypes.arrayOf(PropTypes.node)
};

Primitive.defaultProps = {
  renderEmpty: () => "no items available",
  items: [],
  filterData: {},
  isLoading: false,
  hasError: false,
  placeholderItems: []
};

/////////////// default

const mapRequestData = ({ offset, limit, ...restQueryData }) => ({
  ...restQueryData,
  page: Math.floor(offset / limit) + 1,
  per_page: limit
});

const mapResponseToItems = response => response.items || [];

export const Container = props => {
  const {
    getItems,
    renderItem,
    renderEmpty,
    renderItemPlaceholder,
    limit
  } = props;

  const { items, hasError, isLoading, filter, more, totalCount } = useIndex(
    getItems,
    { mapRequestData, mapResponseToItems, limit }
  );

  const hasMore = useMemo(() => items.length < totalCount, [totalCount, items]);

  const placeholderItems = useMemo(
    () =>
      typeof renderItemPlaceholder === "function"
        ? new Array(limit).fill(renderItemPlaceholder())
        : [],
    [renderItemPlaceholder, limit]
  );

  const newProps = {
    handleFilter: filter,
    items,
    isLoading,
    hasError,
    loadMore: isLoading && hasMore ? null : more,
    renderItem,
    renderEmpty,
    placeholderItems
  };

  return <Primitive {...newProps} />;
};

Container.propTypes = {
  getItems: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  renderEmpty: PropTypes.func,
  limit: PropTypes.number,
  renderItemPlaceholder: PropTypes.func
};

Container.defaultProps = {
  limit: 20,
  renderItemPlaceholder: null
};

export default Container;
