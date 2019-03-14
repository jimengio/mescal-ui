import React from "react";
import { parseRoutePath, IRouteParseResult } from "@jimengio/ruled-router";
import { css } from "emotion";

import Home from "./home";
import Content from "./content";
import WhiteboardPortal from "../whiteboard/portal";

const renderChildPage = (routerTree: IRouteParseResult) => {
  if (routerTree != null) {
    switch (routerTree.name) {
      case "home":
        return <Home />;
      case "content":
        return <Content />;
      case "whiteboard":
        return <WhiteboardPortal router={routerTree.next} />;
    }
  }
  return <div>NOTHING</div>;
};

export default (props) => {
  return (
    <div className={styleContainer}>
      <div className={styleTitle}>Container</div>
      {renderChildPage(props.router)}
    </div>
  );
};

const styleContainer = css`
  font-family: "Helvetica";
`;

const styleTitle = css`
  margin-bottom: 16px;
`;
