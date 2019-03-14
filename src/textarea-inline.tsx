import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";
import _ from "lodash";
import { scrollToElement } from "./utils/dom";
import { lingual } from "./lingual";

interface IProps {
  value: string;
  useMonoFont?: boolean;
  disabled?: boolean;
  disabledMessage?: string;
  placeholder?: string;
  onChange: (text: string) => void;
  fullWidth?: boolean;
  className?: string;
}

interface IState {}

export default class TextareaInline extends React.Component<IProps, IState> {
  inputEl: HTMLTextAreaElement;

  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return (
      <textarea
        className={cx(
          styleTextarea,
          this.props.className,
          this.props.useMonoFont ? styleMonoFont : null,
          this.props.disabled ? styleDisabled : null,
          this.props.fullWidth ? styleFullWidth : null
        )}
        value={this.props.value}
        disabled={this.props.disabled}
        placeholder={this.props.placeholder != null ? this.props.placeholder : lingual.pleaseInput}
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

const styleTextarea = css`
  border: none;
  padding: 8px;
  border: 1px solid #ddd;
  line-height: 24px;
  min-height: 92px;

  display: inline-block;
  min-width: 120px;
`;

const styleMonoFont = css`
  font-family: Menlo, Roboto Mono, Ubuntu Mono, monospace;
`;

const styleDisabled = css`
  background-color: #f0f0f0;
`;

const styleFullWidth = css`
  width: 100%;
`;
