import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";
import { center } from "@jimengio/shared-utils";
import { EColorScheme } from "./utils/colors";

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
        {this.props.text || "lang.defaultLabel"}
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
