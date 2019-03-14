import React from "react";
import { css } from "emotion";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        Home Page
        <a
          onClick={() => {
            window.location.hash = "#/content";
          }}
          className={styleButton}
        >
          Open content
        </a>
        <a
          onClick={async () => {
            let { showTime } = await import("../util/time" /* webpackChunkName:"time" */);
            showTime();
          }}
        >
          Use
        </a>
      </div>
    );
  }
}

const styleButton = css`
  margin: 8px;
  cursor: pointer;
  color: blue;
`;
