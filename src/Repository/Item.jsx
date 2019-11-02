import React, { useCallback } from "react";
import PropTypes from "prop-types";

import { Flex, Box } from "@rebass/grid";

import Item from "Shared/Item";

import { fetchRepository } from "./api";

///////// primitive

export const Primitive = props => (
  <Flex flexDirection="column" p={2}>
    <Box mb={1}>
      <b>{props.name}</b>
    </Box>
    <Box>
      {props.url ? (
        <a href={props.url}> visit repository</a>
      ) : (
        "no link available"
      )}
    </Box>
  </Flex>
);

Primitive.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string
};

Primitive.defaultProps = {
  name: "[repository]",
  url: null
};

///////// placeholder

export const Placeholder = () => (
  <Flex p={2} flexDirection="column" color="lightgrey">
    <Box mb={1}>
      <b>loading repo name</b>
    </Box>
    <Box>loading url</Box>
  </Flex>
);

////////// default

const renderRepository = repository => (
  <Primitive name={repository.full_name} url={repository.html_url} />
);

const renderPlaceholder = () => <Placeholder />;

const renderError = error => "error: " + error;

export const RepositoryItem = props => {
  const { repository, id } = props;

  const getItem = useCallback(() => fetchRepository(id), [id]);

  return (
    <Item
      initialItemData={repository}
      renderItem={renderRepository}
      renderPlaceholder={renderPlaceholder}
      renderError={renderError}
      getItem={getItem}
    />
  );
};

RepositoryItem.propTypes = {
  repository: PropTypes.object,
  id: PropTypes.number
};

RepositoryItem.defaultProps = {
  repository: null,
  id: null
};

export default RepositoryItem;
