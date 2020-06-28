import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "./utils/immer-helper";
import { center } from "@jimengio/flex-styles";
import { EColorScheme } from "./utils/colors";
import { Lingual } from "./lingual";

interface IProps {
  text?: string;
  onClick?: () => void;
  className?: string;
}

interface IState {}

export default class LargeButton extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return (
      <button onClick={this.props.onClick} className={cx(center, styleButton, this.props.className)}>
        {this.props.text || <Lingual text="defaultLabel" />}
      </button>
    );
  }
}

const styleButton = css`
  outline: none;
  border: none;
  background-color: ${EColorScheme.Purple};
  color: white;
  height: 40px;
  width: 100%;
  cursor: pointer;
  font-size: 14px;

  &:hover,
  &:active {
    outline: none;
  }
`;
