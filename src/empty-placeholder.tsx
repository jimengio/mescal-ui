import React from "react";
import { css, cx } from "emotion";
import { center } from "@jimengio/flex-styles";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "./utils/immer-helper";
import { Lingual } from "./lingual";

interface IProps {
  text?: string;
  className?: string;
}

interface IState {}

export default class EmptyPlaceholder extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return <div className={cx(center, styleContainer, this.props.className)}>{this.props.text || <Lingual text="noData" />}</div>;
  }
}

const styleContainer = css`
  padding: 16px;
  color: #aaa;
  font-style: italic;
  font-size: 12px;
`;
