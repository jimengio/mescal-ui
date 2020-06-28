import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "./utils/immer-helper";

interface IProps {
  title: string;
}

interface IState {}

export default class FormSectionTitle extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return <div className={styleContainer}>{this.props.title}</div>;
  }
}

const styleContainer = css`
  background: rgba(235, 235, 235, 1);
  font-size: 14px;
  font-weight: 400;
  color: rgba(151, 151, 151, 1);
  line-height: 24px;
  min-height: 24px;
  padding: 0 16px;
`;
