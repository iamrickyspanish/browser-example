import React from "react";

import Browser from "Shared/Browser";

import Item, { Placeholder } from "./Item";

import { fetchRepositories } from "./api";

const renderItem = repository => (
  <Item repository={repository} key={repository.full_name} />
);

const renderItemPlaceholder = () => <Placeholder />;

export const Container = () => {
  return (
    <Browser
      getItems={fetchRepositories}
      renderItem={renderItem}
      renderItemPlaceholder={renderItemPlaceholder}
    />
  );
};

export default Container;
