import React from "react";
import { parseRoutePath, IRouteParseResult } from "@jimengio/ruled-router";
import { css } from "emotion";

import Home from "./home";
import Content from "./content";
import WhiteboardPortal from "../whiteboard/portal";

const renderChildPage = (routerTree: IRouteParseResult) => {
  return <WhiteboardPortal router={routerTree} />;
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
