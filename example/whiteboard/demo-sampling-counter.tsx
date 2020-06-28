import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "../../src/utils/immer-helper";

import { routeBack } from "../controller/generated-router";
import { Space } from "@jimengio/flex-styles";
import SamplingCounter from "../../src/sampling-counter";

interface IProps {}

interface IState {
  sampleSize: number;
  selectedIndex: number;
}

export default class DemoSamplingCounter extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      sampleSize: 1,
      selectedIndex: 0,
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
        <SamplingCounter
          sampleSize={this.state.sampleSize}
          selectedIndex={this.state.selectedIndex}
          onChange={(selectedIndex: number) => {
            this.immerState((state) => {
              state.selectedIndex = selectedIndex;
            });
          }}
        />
      </div>
    );
  }
}

const styleContainer = css`
  padding: 16px;
`;
