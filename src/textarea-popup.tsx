import React from "react";
import _ from "lodash";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";
import { rowParted, row, center, column } from "@jimengio/shared-utils";
import Space from "./space";
import ThinButton from "./thin-button";
import { shellStylePopupBackground, shellStylePopupCard } from "./styles/shell";

interface IProps {
  value: string;
  atRight?: boolean;
  useMonoFont?: boolean;
  disabled?: boolean;
  disabledMessage?: string;
  onChange: (text: string) => void;
}

interface IState {
  draft: string;
  isEditing: boolean;
}

export default class TextareaPopup extends React.Component<IProps, IState> {
  inputEl: HTMLTextAreaElement;

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
            // showInfoAlertMessage(this.props.disabledMessage || lang.inputIsDisabled);
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
            {"lang.pleaseInput"}
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
          this.immerState((state) => {
            state.isEditing = false;
          });
        }}
      >
        <div
          className={cx(column, shellStylePopupCard)}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <textarea
            value={this.state.draft}
            placeholder={"lang.pleaseInput"}
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
              if ((event.metaKey || event.ctrlKey) && event.key === "Enter" && event.keyCode !== 229) {
                this.onSubmit();
              }
            }}
            className={cx(styleTextarea, this.props.useMonoFont ? styleMonoFont : null)}
          />
          <Space height={16} />
          <div className={rowParted}>
            <span />
            <ThinButton type="primary" className={styleButton} onClick={this.onSubmit}>
              {"lang.save"}
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

const styleTextarea = css`
  padding: 0 8px;
  min-width: 320px;
  min-height: 120px;
  max-width: 600px;
  overflow: auto;
  border: 1px solid #ddd;
  line-height: 28px;
`;

const styleValue = css`
  white-space: pre-line;
  overflow: auto;
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
  display: block;
  flex: 1;
  min-width: 120px;
  overflow: auto;
  text-align: right;
  line-height: 28px;
  min-height: 56px;

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
