import React from "react";
import { isFunction } from "lodash-es";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "./utils/immer-helper";

import { Space, rowParted, row, center, column } from "@jimengio/flex-styles";
import ThinButton from "./thin-button";
import { numberOrEmpty } from "./utils/number";
import { shellStylePopupBackground, shellStylePopupCard } from "./styles/shell";
import { Lingual, lingual } from "./lingual";
import { showInfoAlertMessage } from "./message/message-center";

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

export default class NumberPopup extends React.Component<IProps, IState> {
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
    let atRight = this.props.atRight;

    return (
      <div
        className={cx(styleContainer, this.state.isEditing ? styleOutline : null, this.props.disabled ? styleDisabled : null)}
        onClick={async () => {
          if (this.props.disabled) {
            showInfoAlertMessage(this.props.disabledMessage || lingual.inputIsDisabled);
            return;
          }
          await this.immerState((state) => {
            state.isEditing = true;
            state.draft = this.props.value ? this.props.value.toString() : "";
          });
          this.inputEl.select();
        }}
      >
        {this.props.value != null ? (
          <div className={styleValue} style={{ textAlign: atRight ? "right" : "left" }}>
            {this.props.value}
          </div>
        ) : (
          <div className={styleEmpty} style={{ textAlign: atRight ? "right" : "left" }}>
            {this.props.placeholder || lingual.pleaseAddDigits}
          </div>
        )}

        {this.state.isEditing ? this.renderEditor() : null}
      </div>
    );
  }

  renderEditor() {
    let validation = isFunction(this.props.validate) ? this.props.validate(numberOrEmpty(this.state.draft)) : { ok: true, message: null };

    return (
      <div
        className={shellStylePopupBackground}
        onClick={(event) => {
          event.stopPropagation();
          // this.immerState((state) => {
          //   state.isEditing = false;
          // });
        }}
      >
        <div
          className={cx(column, shellStylePopupCard, styleEditor)}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <input
            value={this.state.draft}
            type="number"
            disabled={this.props.disabled}
            min={this.props.min}
            max={this.props.max}
            placeholder={this.props.placeholder || lingual.pleaseAddDigits}
            ref={(el) => {
              this.inputEl = el;
            }}
            onChange={(event) => {
              let text = event.target.value;
              this.immerState((state) => {
                state.draft = text;
              });
            }}
            className={styleInput}
            onKeyDown={(event) => {
              if (event.key === "Enter" && event.keyCode !== 229) {
                this.onSubmit();
              }
            }}
          />
          <Space height={16} />
          {validation.message != null ? <div className={styleHint}>{validation.message}</div> : null}
          <Space height={16} />
          <div className={rowParted}>
            <span />
            <div>
              <ThinButton
                className={styleButton}
                onClick={() => {
                  this.immerState((state) => {
                    state.isEditing = false;
                  });
                }}
                text={<Lingual text="cancel" />}
              />
              <Space width={16} />
              <ThinButton type="primary" className={styleButton} disabled={!validation.ok} onClick={this.onSubmit} text={<Lingual text="save" />} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  onSubmit = () => {
    let maybeNumber = this.findNumber(this.state.draft);
    if (maybeNumber != null) {
      this.immerState((state) => {
        state.isEditing = false;
      });
      this.props.onChange(maybeNumber);
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
  padding: 0 8px;
  width: 100%;
  line-height: 32px;

  border: 1px solid #ddd;
`;

const styleValue = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const styleEmpty = css`
  color: #ccc;
  font-style: italic;
`;

const styleButton = css`
  padding: 0 8px;
`;

const styleContainer = css`
  display: inline-block;
  text-align: right;
  min-width: 64px;
  max-width: 240px;
  overflow: auto;
  border: 1px solid #ddd;
  padding: 0 8px;
  border-radius: 4px;
  line-height: 32px;
  background-color: white;
`;

const styleHint = css`
  color: #aaa;
`;

const styleOutline = css`
  outline: 2px solid #aaf;
`;

const styleDisabled = css`
  background-color: #f0f0f0;
`;

const styleEditor = css`
  padding-top: 32px;
  margin-top: 120px;
`;
