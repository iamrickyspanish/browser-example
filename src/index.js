import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider } from "styled-components";

import RepositoryBrowser from "Repository/Browser";
import RepositoryItem from "Repository/Item";

import { Flex, Box } from "@rebass/grid";

import "./styles.css";

const favoriteRepoId = 10270250;

function App() {
  return (
    <ThemeProvider theme={{}}>
      <Flex
        style={{
          height: "100vh",
          fontFamily: "sans-serif",
          textAlign: "center"
        }}
        flexDirection="column"
      >
        <Box>
          <b>favorite repository</b>
          <br />
          <RepositoryItem id={favoriteRepoId} />
        </Box>
        <RepositoryBrowser />
      </Flex>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
