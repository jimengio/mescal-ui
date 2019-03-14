import React from "react";
import { css, cx } from "emotion";
import produce from "immer";
import { rowParted } from "@jimengio/shared-utils";

interface IProps {
  leftChild?: React.ReactElement<any>;
  rightChild: React.ReactElement<any>;
}

interface IState {}

export default class FooterOperations extends React.Component<IProps, IState> {
  render() {
    return (
      <div className={cx(rowParted, styleContainer)}>
        {this.props.leftChild || <span />}
        {this.props.rightChild || <span />}
      </div>
    );
  }
}

const styleContainer = css`
  padding: 8px;
  background-color: white;
`;
