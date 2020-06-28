import React, { ReactElement } from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "./utils/immer-helper";
import { rowParted, rowCenter } from "@jimengio/flex-styles";
import { EColorScheme } from "./utils/colors";

interface IProps {
  title: string;
  leftChild?: ReactElement<any>;
  rightChild?: ReactElement<any>;
}

interface IState {}

export default class NavHeader extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return (
      <div className={cx(rowParted, styleContainer)}>
        <div className={styleButtonWrapper}>{this.props.leftChild}</div>
        <span>{this.props.title}</span>
        <div className={cx(styleButtonWrapper, styleRight)}>{this.props.rightChild}</div>
      </div>
    );
  }
}

const styleContainer = css`
  height: 48px;
  position: relative;
  padding: 0 16px;
  align-items: center;
  font-size: 16px;
  background-color: ${EColorScheme.Purple};
  color: white;
`;

const styleButtonWrapper = css`
  min-width: 80px;
`;

const styleRight = css`
  display: flex;
  justify-content: flex-end;
`;
