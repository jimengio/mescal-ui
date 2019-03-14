import React from "react";
import { css, cx } from "emotion";
import { center } from "@jimengio/shared-utils";

interface IProps {
  text?: string;
  type?: "primary" | "default";
  className?: string;
  disabled?: boolean;
  onClick: (event: MouseEvent) => void;
}

interface IState {}

export default class ThinButton extends React.Component<IProps, IState> {
  render() {
    let text = this.props.text || this.props.children || "lang.confirm";

    return (
      <button className={cx(center, styleButton, this.getStyle(), this.props.className)} onClick={this.onClick}>
        {text}
      </button>
    );
  }

  getStyle(): string {
    if (this.props.disabled) {
      return styleDisabled;
    }

    let type = this.props.type || "default";
    return type === "primary" ? stylePrimary : null;
  }

  onClick = (event) => {
    if (!this.props.disabled) {
      this.props.onClick(event);
    }
  };
}

const styleButton = css`
  display: inline-flex;
  border: 1px solid #184478;
  background-color: white;
  outline: none;
  border-radius: 4px;
  height: 32px;
  min-width: 96px;
  font-size: 14px;
  color: #184478;
`;

const stylePrimary = css`
  background-color: #45628f;
  color: white;
`;

const styleDisabled = css`
  color: #999;
  border-color: #eee;
  background-color: #eee;
`;
