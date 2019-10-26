import React from "react";

import { Flex, Box } from "@rebass/grid";

const RepositoryItem = props => (
  <Flex flexDirection="column" p={2}>
    <Box mb={1}>
      <b>{props.data.full_name}</b>
    </Box>
    <Box>
      <a href={props.data.html_url}> visit repository</a>
    </Box>

    {/* {props.data.description} */}
  </Flex>
);

export const Placeholder = () => (
  <Flex p={2} flexDirection="column" color="lightgrey">
    <Box mb={1}>
      <b>loading repo name</b>
    </Box>
    <Box>loading link</Box>
  </Flex>
);

export default RepositoryItem;
