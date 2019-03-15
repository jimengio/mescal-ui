import React, { SFC, useState } from "react";
import NavigatorPage from "../../src/navigator-page";
import { css } from "emotion";

interface IProps {}

let DemoNavigatorPage: SFC<IProps> = (props) => {
  let [visible, setVisible] = useState(false);

  return (
    <div>
      <NavigatorPage
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      >
        <div
          className={styleContainer}
          onClick={() => {
            setVisible(false);
          }}
        >
          Close
        </div>
      </NavigatorPage>

      <div
        className={styleContainer}
        onClick={() => {
          setVisible(!visible);
        }}
      >
        Toggle
      </div>
    </div>
  );
};

let styleContainer = css`
  padding: 16px;
`;

export default DemoNavigatorPage;
