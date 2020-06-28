import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "../../src/utils/immer-helper";
import RangePopup from "../../src/range-popup";
import { routeBack } from "../controller/generated-router";
import { Space } from "@jimengio/flex-styles";

interface IProps {}

interface IState {
  timeFrom: string;
  timeTo: string;
}

export default class DemoRangePicker extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      timeFrom: null,
      timeTo: null,
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
        <RangePopup
          timeFrom={this.state.timeFrom}
          timeTo={this.state.timeTo}
          onChange={(timeFrom, timeTo) => {
            this.immerState((state) => {
              state.timeFrom = timeFrom;
              state.timeTo = timeTo;
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
