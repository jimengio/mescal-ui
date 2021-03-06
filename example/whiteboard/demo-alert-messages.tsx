import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "../../src/utils/immer-helper";
import { routeBack } from "../controller/generated-router";
import { Space } from "@jimengio/flex-styles";
import ThinButton from "../../src/thin-button";
import { EAlertMessageKind } from "../../src/models/alert-message";
import { loremIpsum } from "lorem-ipsum";
import { showAlertMessage } from "../../src/message/message-center";

interface IProps {}

interface IState {}

export default class DemoAlertMessages extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return (
      <div className={styleContainer}>
        <div className={styleToolbar}>
          <a onClick={routeBack}>Back</a>
        </div>
        <Space height={16} />
        <ThinButton
          text={"Warning"}
          onClick={() => {
            this.onShowMessage(EAlertMessageKind.Warning);
          }}
        />

        <Space width={16} />
        <ThinButton
          text={"Success"}
          onClick={() => {
            this.onShowMessage(EAlertMessageKind.Success);
          }}
        />

        <Space width={16} />
        <ThinButton
          text={"Info"}
          onClick={() => {
            this.onShowMessage(EAlertMessageKind.Info);
          }}
        />
      </div>
    );
  }

  onShowMessage(x: EAlertMessageKind) {
    showAlertMessage({
      kind: x,
      text: loremIpsum({
        count: Math.floor(Math.random() * 24),
        units: "words",
      }),
      duration: 4,
    });
  }
}

const styleToolbar = css``;

const styleContainer = css`
  padding: 16px;
  background-color: #f0f6ff;
`;
