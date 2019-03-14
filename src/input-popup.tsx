import React from "react";
import _ from "lodash";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";
import { rowParted, row, center, column } from "@jimengio/shared-utils";
import Space from "./space";
import ThinButton from "./thin-button";
import { shellStylePopupBackground, shellStylePopupCard } from "./styles/shell";
import { Lingual, lingual } from "./lingual";

interface IProps {
  value: string;
  atRight?: boolean;
  useMonoFont?: boolean;
  disabled?: boolean;
  disabledMessage?: string;
  placeholder?: string;
  onChange: (text: string) => void;
}

interface IState {
  draft: string;
  isEditing: boolean;
}

export default class InputPopup extends React.Component<IProps, IState> {
  inputEl: HTMLInputElement;

  constructor(props) {
    super(props);

    this.state = {
      draft: this.props.value || "",
      isEditing: false, // debug
    };
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    let atRight = this.props.atRight;
    return (
      <div
        className={cx(styleContainer, this.props.disabled ? styleDisabled : null, this.state.isEditing ? styleOutline : null)}
        onClick={async () => {
          if (this.props.disabled) {
            // showInfoAlertMessage(this.props.disabledMessage || lingual.inputIsDisabled);
            console.warn("TODO");
            return;
          }
          await this.immerState((state) => {
            state.isEditing = true;
            state.draft = this.props.value;
          });
          this.inputEl.select();
        }}
      >
        {!_.isEmpty(this.props.value) ? (
          <div className={cx(styleValue, this.props.useMonoFont ? styleMonoFont : null)} style={{ textAlign: atRight ? "right" : "left" }}>
            {this.props.value}
          </div>
        ) : (
          <div className={styleEmpty} style={{ textAlign: atRight ? "right" : "left" }}>
            {this.props.placeholder || <Lingual text="pleaseSelect" />}
          </div>
        )}

        {this.state.isEditing ? this.renderEditor() : null}
      </div>
    );
  }

  renderEditor() {
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
          className={cx(column, shellStylePopupCard)}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <input
            value={this.state.draft}
            placeholder={this.props.placeholder || lingual.pleaseInput}
            ref={(el) => {
              this.inputEl = el;
            }}
            onChange={(event) => {
              let text = event.target.value;
              this.immerState((state) => {
                state.draft = text;
              });
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" && event.keyCode !== 229) {
                this.onSubmit();
              }
            }}
            className={cx(styleInput, this.props.useMonoFont ? styleMonoFont : null)}
          />
          <Space height={16} />
          <div className={rowParted}>
            <span />
            <ThinButton type="primary" className={styleButton} onClick={this.onSubmit}>
              {lingual.save}
            </ThinButton>
          </div>
        </div>
      </div>
    );
  }

  onSubmit = () => {
    this.immerState((state) => {
      state.isEditing = false;
    });
    this.props.onChange(this.state.draft);
  };
}

const styleInput = css`
  border: none;
  padding: 0 8px;
  width: 100%;
  border: 1px solid #ddd;
  line-height: 32px;
`;

const styleValue = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const styleEmpty = css`
  white-space: nowrap;
  overflow: hidden;
  color: #ccc;
  font-style: italic;
`;

const styleButton = css`
  padding: 0 8px;
`;

const styleContainer = css`
  display: inline-block;
  min-width: 120px;
  max-width: 240px;
  overflow: auto;
  text-align: right;
  max-width: 60%;
  line-height: 32px;
  background-color: white;

  border: 1px solid #ddd;
  padding: 0 8px;
  border-radius: 4px;
`;

const styleMonoFont = css`
  font-family: Menlo, Roboto Mono, Ubuntu Mono, monospace;
`;

const styleOutline = css`
  outline: 2px solid #aaf;
`;

const styleDisabled = css`
  background-color: #f0f0f0;
`;
