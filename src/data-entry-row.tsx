import React from "react";
import { css, cx } from "emotion";
import { row, rowCenter, flex, column, center } from "@jimengio/shared-utils";
import { Icon } from "antd-mobile";
import FaIcon, { EFaIcon } from "@jimengio/fa-icons";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";

interface IProps {
  icon: React.ReactNode;
  title: string;
  hintText: string | React.ReactNode;
  onClick?: () => void;
  hideArrow?: boolean;
}

interface IState {}

export default class DataEntryRow extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return (
      <div className={cx(row, styleContainer)} onClick={this.props.onClick}>
        <div className={cx(center, styleIconContainer)}>{this.props.icon}</div>
        <div className={cx(flex, column)}>
          <div className={styleTitle}>{this.props.title}</div>
          <div className={styleHintText}>{this.props.hintText}</div>
        </div>
        {this.props.hideArrow ? null : (
          <div className={cx(center, styleIconContainer, styleArrow)}>
            <FaIcon name={EFaIcon.AngleRight} />
          </div>
        )}
      </div>
    );
  }
}

const styleTitle = css`
  line-height: 23px;
  color: rgba(16, 16, 16, 1);
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  margin-bottom: 8px;
`;

const styleHintText = css`
  line-height: 16px;
  color: rgba(102, 102, 102, 1);
  font-size: 12px;
  white-space: nowrap;

  overflow: hidden;
  text-overflow: ellipsis;
`;

const styleIconContainer = css`
  width: 40px;
`;

const styleArrow = css`
  font-size: 16px;
`;

const styleContainer = css`
  border-bottom: 1px solid rgb(238, 238, 238);
  padding: 8px 0;
  cursor: pointer;
  background-color: white;
`;
