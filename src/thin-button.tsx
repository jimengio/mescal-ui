import React, { ReactNode } from "react";
import { css, cx } from "emotion";
import { center } from "@jimengio/shared-utils";
import { EColorScheme } from "./utils/colors";
import { Lingual } from "./lingual";

interface IProps {
  text?: ReactNode;
  type?: "primary" | "default";
  className?: string;
  disabled?: boolean;
  onClick: (event: MouseEvent) => void;
}

interface IState {}

export default class ThinButton extends React.Component<IProps, IState> {
  render() {
    let text = this.props.text || this.props.children || <Lingual text="confirm" />;

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
  border: 1px solid ${EColorScheme.Purple};
  background-color: white;
  outline: none;
  height: 32px;
  min-width: 96px;
  font-size: 14px;
  color: #184478;
`;

const stylePrimary = css`
  background-color: ${EColorScheme.Purple};
  color: white;
`;

const styleDisabled = css`
  color: #999;
  border-color: #eee;
  background-color: #eee;
`;
