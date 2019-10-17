import React from "react";
import { css, cx } from "emotion";
import FaIcon, { EFaIcon } from "@jimengio/fa-icons";
import { Space } from "@jimengio/flex-styles";
import { row } from "@jimengio/shared-utils";
import { Lingual } from "./lingual";

interface IProps {
  title?: string;
  onClick: () => void;
}

interface IState {}

export default class ArrowBack extends React.Component<IProps, IState> {
  render() {
    return (
      <div className={cx(row, styleContainer)} onClick={this.props.onClick}>
        <FaIcon name={EFaIcon.AngleLeft} />
        <Space width={12} />
        <div>{this.props.title ? this.props.title : <Lingual text="back" />}</div>
      </div>
    );
  }
}

const styleContainer = css`
  font-size: 14px;
  align-items: center;
  cursor: pointer;
`;
