import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "./utils/immer-helper";
import { Space } from "@jimengio/flex-styles";
import { row, rowCenter } from "@jimengio/flex-styles";
import { EColorScheme } from "./utils/colors";

interface IProps {
  value: number;
}

interface IState {}

export default class ProcessPercent extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return (
      <div className={cx(rowCenter, styleContainer)}>
        <div className={cx(row, styleProcessBar)}>
          <div className={styleProcessInner} style={{ width: `${this.props.value}%` }} />
        </div>
        <Space width={8} />
        {this.props.value.toFixed()}%
      </div>
    );
  }
}

const styleContainer = css`
  display: inline-flex;
  color: ${EColorScheme.Purple};
`;

const styleProcessBar = css`
  width: 100px;
  height: 10px;
  background-color: #cccccc;
  border-radius: 5px;
`;

const styleProcessInner = css`
  background-color: ${EColorScheme.Purple};
  border-radius: 5px;
`;
