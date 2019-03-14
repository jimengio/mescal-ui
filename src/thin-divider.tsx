import React, { CSSProperties } from "react";
import { css, cx } from "emotion";
import produce from "immer";

interface IProps {
  color?: string;
  margin?: number;
  vertical?: boolean;
}

interface IState {}

export default class ThinDivider extends React.Component<IProps, IState> {
  render() {
    if (this.props.vertical) {
      return this.renderVerticalDivider();
    }
    return <div className={styleHorizontal} style={this.getStyle()} />;
  }

  renderVerticalDivider() {
    return <div className={styleVertical} />;
  }

  getStyle(): CSSProperties {
    let margin = this.props.margin || 0;
    return { backgroundColor: this.props.color || "rgb(221, 221, 221)", margin: this.props.vertical ? `0 ${margin}px` : `${margin}px 0` };
  }
}

const styleVertical = css`
  width: 1px;
  height: 100%;
`;

const styleHorizontal = css`
  width: 100%;
  height: 1px;
`;
