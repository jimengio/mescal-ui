import React from "react";
import { parseRoutePath, IRouteParseResult } from "@jimengio/ruled-router";
import { css } from "emotion";

import WhiteboardPortal from "../whiteboard/portal";
import AlertMessages from "../../src/alert-messages";

const renderChildPage = (routerTree: IRouteParseResult) => {
  return <WhiteboardPortal router={routerTree} />;
};

export default (props) => {
  return (
    <div className={styleContainer}>
      {renderChildPage(props.router)}

      <AlertMessages />
    </div>
  );
};

const styleContainer = css`
  font-family: "Helvetica";
`;

const styleTitle = css`
  margin-bottom: 16px;
`;
