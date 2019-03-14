import React from "react";
import _ from "lodash";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";
import { rowParted, row, center } from "@jimengio/shared-utils";
import Space from "./space";
import { Lingual } from "./lingual";

interface IProps {
  label?: string;
  isRequired?: boolean;
  underline?: boolean;
  scan?: any;
}

interface IState {}

export default class LabelField extends React.Component<IProps, IState> {
  inputEl: HTMLInputElement;

  constructor(props) {
    super(props);

    this.state = {};
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return (
      <div className={cx(rowParted, styleContainer, this.props.underline ? styleUnderline : null)}>
        <div className={cx(styleLabel)}>
          {this.props.label || <Lingual text="defaultLabel" />}
          {this.props.isRequired ? this.renderRequired() : null}
          <Space width={16} />
          {this.props.scan}
        </div>
        {this.props.children}
      </div>
    );
  }

  renderRequired() {
    return <span className={styleRequired}> *</span>;
  }
}

const styleLabel = css`
  color: #777;
  white-space: nowrap;
`;

const styleContainer = css`
  padding: 8px 16px;
  line-height: 32px;
  align-items: flex-start;
`;

const styleRequired = css`
  color: red;
`;

const styleUnderline = css`
  border-bottom: 1px solid rgb(221, 221, 221);
`;
