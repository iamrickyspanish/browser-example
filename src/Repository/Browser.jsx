import React from "react";

import Browser from "Shared/Browser";
import axios from "axios";

import Item, { Placeholder } from "./Item";

const fetchRepositories = async data => {
  const response = await axios.get(
    "https://api.github.com/search/repositories",
    { params: data }
  );
  return response.data;
};

const renderItem = repository => (
  <Item data={repository} key={repository.full_name} />
);

export const Container = () => {
  return (
    <Browser
      getItems={fetchRepositories}
      renderItem={renderItem}
      placeholderItem={<Placeholder />}
    />
  );
};

export default Container;
