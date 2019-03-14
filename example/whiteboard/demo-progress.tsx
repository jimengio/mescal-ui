import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";
import { routeBack } from "../controller/generated-router";
import Space from "../../src/space";
import ThinButton from "../../src/thin-button";
import ThinProgress from "../../src/thin-progress";
import ProcessPercent from "../../src/progress-percent";

interface IProps {}

interface IState {
  isProcessing: boolean;
  ratio: number;
}

export default class DemoProgress extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isProcessing: true,
      ratio: 30,
    };
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
        <div>
          <ThinButton
            text="0"
            onClick={() => {
              this.immerState((state) => {
                state.isProcessing = false;
                state.ratio = 0;
              });
            }}
          />
          <Space width={16} />
          <ThinButton
            text="30"
            onClick={() => {
              this.immerState((state) => {
                state.isProcessing = true;
                state.ratio = 30;
              });
            }}
          />
          <Space width={16} />
          <ThinButton
            text="60"
            onClick={() => {
              this.immerState((state) => {
                state.isProcessing = true;
                state.ratio = 60;
              });
            }}
          />
          <Space width={16} />
          <ThinButton
            text="100"
            onClick={() => {
              this.immerState((state) => {
                state.isProcessing = false;
                state.ratio = 100;
              });
            }}
          />
        </div>
        <Space height={16} />
        <div className={styleArea}>
          <ThinProgress isProcessing={this.state.isProcessing} ratio={this.state.ratio} />
        </div>

        <Space height={40} />

        <ProcessPercent value={50} />
      </div>
    );
  }
}

const styleContainer = css`
  padding: 16px;
`;

const styleArea = css`
  width: 200px;
`;
