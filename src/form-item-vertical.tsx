import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";

interface IProps {
  label?: string;
  isRequired?: boolean;
}

interface IState {}

export default class FormItemVertical extends React.Component<IProps, IState> {
  inputEl: HTMLInputElement;

  constructor(props) {
    super(props);

    this.state = {};
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return (
      <div className={styleContainer}>
        <div className={cx(styleLabel, styleSmaller)}>
          {this.props.label || "lang.defaultLabel"}
          {this.props.isRequired ? this.renderRequired() : null}
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
`;

const styleRequired = css`
  color: red;
`;

const styleSmaller = css`
  line-height: 18px;
  margin-bottom: 8px;
`;
