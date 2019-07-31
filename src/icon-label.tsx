import React from "react";
import { css, cx } from "emotion";
import FaIcon, { EFaIcon } from "@jimengio/fa-icons";
import Space from "./space";
import { row } from "@jimengio/shared-utils";

interface IProps {
  icon: EFaIcon;
  label: string;
  onClick?: () => void;
  className?: string;
}

interface IState {}

export default class IconLabel extends React.Component<IProps, IState> {
  render() {
    return (
      <div className={cx(row, styleContainer, this.props.className)} onClick={this.props.onClick}>
        <FaIcon name={this.props.icon} />
        <Space width={12} />
        <div>{this.props.label}</div>
      </div>
    );
  }
}

const styleContainer = css`
  font-size: 14px;
  align-items: center;
  cursor: pointer;
`;
