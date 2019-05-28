import React from "react";
import _ from "lodash";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";

import { rowParted, row, center, column } from "@jimengio/shared-utils";
import { numberOrEmpty } from "./utils/number";
import { scrollToElement } from "./utils/dom";
import { lingual } from "./lingual";
import { showInfoAlertMessage } from "./message/message-center";
// import { showInfoAlertMessage } from "controllers/alert-message";

interface IProps {
  value: number;
  min?: number;
  max?: number;
  validate?: (x: number) => { ok: boolean; message: string };
  atRight?: boolean;
  onChange: (text: number) => void;
  disabled?: boolean;
  placeholder?: string;
  disabledMessage?: string;
}

interface IState {
  draft: string;
  isEditing: boolean;
}

export default class NumberInline extends React.Component<IProps, IState> {
  inputEl: HTMLInputElement;

  constructor(props) {
    super(props);

    this.state = {
      draft: this.props.value != null ? this.props.value.toString() : "",
      isEditing: false, // debug
    };
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return (
      <div className={cx(styleContainer, this.props.disabled ? styleDisabled : null)}>{this.state.isEditing ? this.renderEditor() : this.renderPreview()}</div>
    );
  }

  renderPreview() {
    let { atRight, value } = this.props;

    return (
      <div className={styleValue} style={{ textAlign: atRight ? "right" : "left" }} onClick={this.onEdit}>
        {value != null ? value : <span className={styleEmpty}>{this.props.placeholder || lingual.pleaseAddDigits}</span>}
      </div>
    );
  }

  onEdit = async () => {
    if (this.props.disabled) {
      showInfoAlertMessage(this.props.disabledMessage || lingual.inputIsDisabled);
      return;
    }
    await this.immerState((state) => {
      state.isEditing = true;
      state.draft = this.props.value ? this.props.value.toString() : "";
    });
    this.inputEl.select();
    scrollToElement(this.inputEl);
  };

  renderEditor = () => {
    let validation = _.isFunction(this.props.validate) ? this.props.validate(numberOrEmpty(this.state.draft)) : { ok: true, message: null };
    let { atRight } = this.props;

    return (
      <input
        value={this.state.draft}
        type="number"
        disabled={this.props.disabled}
        min={this.props.min}
        max={this.props.max}
        placeholder={this.props.placeholder || lingual.pleaseAddDigits}
        style={{ textAlign: atRight ? "right" : "left" }}
        ref={(el) => {
          this.inputEl = el;
        }}
        onBlur={() => {
          this.onSubmit();
        }}
        onChange={(event) => {
          let text = event.target.value;
          this.immerState((state) => {
            state.draft = text;
          });
          let maybeNumber = this.findNumber(text);
          // console.log("change", JSON.stringify(text), maybeNumber);
          if (maybeNumber != null) {
            this.props.onChange(maybeNumber);
          } else if (text.trim() === "") {
            // submit empty
            // <input/> also returns empty string when value is invalid
            this.props.onChange(null);
          } else {
            // do no submit invalid values
          }
        }}
        className={styleInput}
        onKeyDown={(event) => {
          if (event.key === "Enter" && event.keyCode !== 229) {
            this.onSubmit();
          }
        }}
      />
    );
  };

  onSubmit = () => {
    let maybeNumber = this.findNumber(this.state.draft);
    if (maybeNumber != null) {
      this.immerState((state) => {
        state.isEditing = false;
      });
      this.props.onChange(maybeNumber);
    } else {
      // reset draft state if value is not valid
      this.immerState((state) => {
        state.isEditing = false;
        state.draft = this.props.value as any;
      });
    }
  };

  findNumber(x: string): number {
    let guess = parseFloat(x);
    if (isNaN(guess)) {
      return null;
    } else {
      if (this.props.validate != null) {
        let validation = this.props.validate(guess) || { ok: true };
        return validation.ok ? guess : null;
      } else {
        return guess;
      }
    }
  }
}

const styleInput = css`
  border: none;
  padding: 0px;
  width: 100px;
  line-height: 32px;
  background-color: transparent;

  border: none;
`;

const styleValue = css`
  white-space: nowrap;
  overflow: hidden;
  /** render some height even exceptional empty values passed in */
  min-height: 24px;
  text-overflow: ellipsis;
  min-width: 100px;
`;

const styleContainer = css`
  display: inline-block;
  text-align: right;
  max-width: 240px;
  overflow: auto;
  border: 1px solid #ddd;
  padding: 0 8px;
  border-radius: 4px;
  line-height: 32px;
  background-color: white;
`;

const styleDisabled = css`
  background-color: #f0f0f0;
`;

const styleEmpty = css`
  white-space: nowrap;
  color: #ccc;
`;
