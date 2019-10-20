import React from "react";

import Browser from "Shared/Browser";
import axios from "axios";

import Item from "./Item";

const fetchRepositories = async data => {
  const response = await axios.get(
    "https://api.github.com/search/repositories",
    { params: data }
  );
  return response.data && response.data.items;
};

const renderItem = repository => (
  <Item data={repository} key={repository.full_name} />
);

export const Container = () => {
  return <Browser getItems={fetchRepositories} renderItem={renderItem} />;
};

export default Container;
