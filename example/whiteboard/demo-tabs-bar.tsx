import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "../../src/utils/immer-helper";
import { routeBack } from "../controller/generated-router";
import { Space } from "@jimengio/flex-styles";
import TabsBar, { ICandidate } from "../../src/tabs-bar";
import TabButton from "../../src/tab-button";

interface IProps {}

interface IState {
  candidates: ICandidate[];
  selected: string;
}

export default class DemoTabsBar extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    let candidates = [
      { value: "tasks", display: "任务" },
      { value: "devices", display: "设备" },
    ];

    this.state = {
      candidates: candidates,
      selected: candidates[0].value,
    };
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return (
      <div className={styleContainer}>
        <a onClick={routeBack}>Back</a>
        <Space height={16} />

        <div className={styleArea}>
          <TabsBar
            candidates={this.state.candidates}
            value={this.state.selected}
            onChange={(value) => {
              this.immerState((state) => {
                state.selected = value;
              });
            }}
          />
          <Space height={40} />
          <TabsBar
            theme="bright"
            candidates={this.state.candidates}
            value={this.state.selected}
            onChange={(value) => {
              this.immerState((state) => {
                state.selected = value;
              });
            }}
          />
        </div>
        <Space width={16} />
        <div>
          <TabButton text={"我的任务"} active={true} onClick={() => {}} />
          <Space width={16} />
          <TabButton text={"所有人"} active={false} onClick={() => {}} />
        </div>
      </div>
    );
  }
}

const styleContainer = css`
  padding: 16px;
  max-width: 360px;
  background-color: #f0f6ff;
`;

const styleArea = css`
  /* border: 1px solid black; */
`;
