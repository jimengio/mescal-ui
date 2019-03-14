import React from "react";
import { css, cx } from "emotion";
import { center } from "@jimengio/shared-utils";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";

interface IProps {
  text?: string;
  className?: string;
}

interface IState {}

export default class EmptyPlacehoder extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return <div className={cx(center, styleContainer, this.props.className)}>{this.props.text || "lang.noData"}</div>;
  }
}

const styleContainer = css`
  padding: 16px;
  color: #aaa;
  font-style: italic;
  font-size: 12px;
`;
