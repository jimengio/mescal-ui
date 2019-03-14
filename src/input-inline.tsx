import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";

import _ from "lodash";
import { scrollToElement } from "./utils/dom";

interface IProps {
  value: string;
  atRight?: boolean;
  useMonoFont?: boolean;
  disabled?: boolean;
  disabledMessage?: string;
  placeholder?: string;
  onChange: (text: string) => void;
}

interface IState {}

export default class InputInline extends React.Component<IProps, IState> {
  inputEl: HTMLInputElement;

  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    let atRight = this.props.atRight;

    return (
      <input
        className={cx(styleInput, this.props.useMonoFont ? styleMonoFont : null, this.props.disabled ? styleDisabled : null)}
        style={{ textAlign: atRight ? "right" : "left" }}
        value={this.props.value}
        disabled={this.props.disabled}
        placeholder={this.props.placeholder != null ? this.props.placeholder : "lang.pleaseInput"}
        onChange={(event) => {
          let text = event.target.value;
          this.props.onChange(text);
        }}
        ref={(el) => {
          this.inputEl = el;
        }}
        onClick={() => {
          scrollToElement(this.inputEl);
        }}
      />
    );
  }
}

const styleInput = css`
  border: none;
  padding: 0 8px;
  border: 1px solid #ddd;
  line-height: 32px;

  display: inline-block;
  min-width: 120px;
  max-width: 240px;
`;

const styleMonoFont = css`
  font-family: Menlo, Roboto Mono, Ubuntu Mono, monospace;
`;

const styleDisabled = css`
  background-color: #f0f0f0;
`;
