import React from "react";

import { Flex, Box } from "@rebass/grid";

const RepositoryItem = props => (
  <Flex flexDirection="column" p={2}>
    <Box mb={1}>
      <b>{props.data.full_name}</b> |{" "}
      <a href={props.data.html_url}> visit repository</a>
    </Box>

    {props.data.description}
  </Flex>
);

export default RepositoryItem;
