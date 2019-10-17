import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";
import { routeBack } from "../controller/generated-router";
import { Space } from "@jimengio/flex-styles";

import QrCodePopup from "../../src/qrcode-popup";

interface IProps {}

interface IState {}

export default class DemoQrCode extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return (
      <div className={styleContainer}>
        <div>
          <a onClick={routeBack}>Back</a>
        </div>
        <Space height={16} />
        <QrCodePopup
          onDetect={(code) => {
            console.log("detected", code);
          }}
        />
      </div>
    );
  }
}

const styleContainer = css`
  padding: 16px;
`;
