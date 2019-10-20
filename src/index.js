import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider } from "styled-components";

import RepositoryBrowser from "Repository/Browser";

import "./styles.css";

function App() {
  return (
    <ThemeProvider theme={{}}>
      <div className="App">
        <RepositoryBrowser />
      </div>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
