import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider } from "styled-components";

import RepositoryBrowser from "Repository/Browser";
import RepositoryItem from "Repository/Item";

import "./styles.css";

const favoriteRepoId = 10270250;

function App() {
  return (
    <ThemeProvider theme={{}}>
      <div className="App">
        <div>
          <b>favorite repository</b>
          <br />
          <RepositoryItem id={favoriteRepoId} />
        </div>
        <RepositoryBrowser />
      </div>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
