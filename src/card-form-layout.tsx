import React from "react";
import { css, cx } from "emotion";
import produce from "immer";
import { column, flex, row } from "@jimengio/shared-utils";

interface IProps {
  footer: React.ReactElement<any>;
}

interface IState {}

export default class CardFormLayout extends React.Component<IProps, IState> {
  render() {
    return (
      <div className={cx(flex, column)}>
        <div className={cx(flex, row, styleBackground)}>
          <div className={cx(flex, styleCard)}>{this.props.children}</div>
        </div>
        {this.props.footer}
      </div>
    );
  }
}

const styleBackground = css`
  background-color: #f4f8ff;
`;

const styleCard = css`
  width: auto;
  max-width: 600px;
  margin: 0 auto;
  padding: 32px 0;
`;
