import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import assert from "assert";
import { MainView } from "./components/main-view/main-view";

// Import statement to indicate that you need to bundle "./index.scss"
import "./style.scss";
import { Container } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";

// Main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Container>
          <MainView />
        </Container>
      </BrowserRouter>
    );
  }
}

// Finds the root of the app
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render the app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
