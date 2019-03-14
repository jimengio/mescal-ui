import ReactDOM, { unstable_renderSubtreeIntoContainer } from "react-dom";
import React from "react";
import "./main.css";

import "antd-mobile/dist/antd-mobile.css";
import "font-awesome/css/font-awesome.min.css";

import { parseRoutePath, IRouteParseResult } from "@jimengio/ruled-router";

import { routerRules } from "./models/router-rules";

import Container from "./pages/container";

const renderApp = () => {
  let routerTree = parseRoutePath(window.location.hash.slice(1), routerRules);

  ReactDOM.render(<Container router={routerTree} />, document.querySelector(".app"));
};

window.onload = renderApp;

window.addEventListener("hashchange", () => {
  renderApp();
});

declare var module: any;

if (module.hot) {
  module.hot.accept(["./pages/container"], () => {
    renderApp();
  });
}
