import React from "react";
import _ from "lodash";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";

import { rowParted, row, center, flex, column } from "@jimengio/shared-utils";
import Space from "./space";
import ThinButton from "./thin-button";
import FaIcon, { IconName } from "@jimengio/fa-icons";
import { shellStylePopupBackground, shellStylePopupCard } from "./styles/shell";
import ThinDivider from "./thin-divider";
import { Lingual, lingual } from "./lingual";

let found = (x: string, y: string) => {
  return x.toLocaleLowerCase().includes((y || "").trim().toLowerCase());
};

interface IProps {
  value: string;
  guideText?: string;
  placeholder?: string;
  atRight?: boolean;
  noClear?: boolean;
  options: { key?: string; display: any; value: any; searchText?: string }[];
  // fromInput: whether value provided from input box
  onChange: (text: string, fromInput?: boolean) => void;
  disabled?: boolean;
  disabledMessage?: string;
  useMonoFont?: boolean;
}

interface IState {
  isEditing: boolean;
  draft: string;
}

// 这个组件需要 value 保持单一, 编辑文本, 选中内容得到的 value, 应该是一样的.
// 反例比如 batch 要用 code, 如果用 id 就在编辑区域会乱
export default class InputSelectPopup extends React.Component<IProps, IState> {
  inputEl: HTMLInputElement;

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      draft: this.props.value || "",
    };
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    let { atRight, options } = this.props;

    return (
      <div
        className={cx(styleContainer, this.state.isEditing ? styleOutline : null, this.props.disabled ? styleDisabled : null)}
        onClick={() => {
          if (this.props.disabled) {
            // showInfoAlertMessage(this.props.disabledMessage || lingual.inputIsDisabled);
            console.warn("TODO");
            return;
          }
          this.immerState((state) => {
            state.isEditing = true;
            state.draft = this.props.value;
          });
        }}
      >
        {this.props.value != null ? (
          <div className={styleValue} style={{ textAlign: atRight ? "right" : "left" }}>
            {this.displayValue()}
            <Space width={8} />
            <FaIcon name={IconName.AngleDown} />
          </div>
        ) : (
          <div className={styleEmpty} style={{ textAlign: atRight ? "right" : "left" }}>
            {this.props.placeholder != null ? (
              this.props.placeholder
            ) : _.isEmpty(options) ? (
              <Lingual text="noCandidates" />
            ) : (
              <Lingual text="xCandidates" replaceData={{ x: options.length }} />
            )}
            <Space width={8} />
            <FaIcon name={IconName.AngleDown} />
          </div>
        )}

        {this.state.isEditing ? this.renderEditor() : null}
      </div>
    );
  }

  displayValue() {
    let target = this.props.options.find((x) => x.value === this.props.value);

    return target != null ? target.display : this.props.value;
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
          className={cx(column, shellStylePopupCard, styleEditingArea)}
          style={{ maxHeight: window.innerHeight - 100 }}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className={rowParted}>
            {this.props.guideText || <Lingual text="pleaseSelect" />}

            {!this.props.noClear ? <ThinButton onClick={this.onClear} text={<Lingual text="clear" />} /> : null}
          </div>

          <Space height={8} />
          <input
            value={this.state.draft || undefined}
            placeholder={lingual.inputManually}
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
          <Space height={8} />
          <div className={cx(flex, styleCandidates)}>
            {this.props.options.length > 0
              ? this.props.options
                  .filter((option) => {
                    if (_.isString(option.display)) {
                      return found(option.display, this.state.draft);
                    } else if (_.isString(option.searchText)) {
                      return found(option.searchText, this.state.draft);
                    } else {
                      console.warn("No text content to search in", option);
                      return true;
                    }
                  })
                  .map((option) => {
                    let optionValue = option.value;

                    return (
                      <div
                        key={option.key || option.value}
                        className={cx(styleItem, option.value === this.props.value ? styleItemSelected : null)}
                        onClick={() => {
                          this.props.onChange(optionValue);

                          setTimeout(() => {
                            this.immerState((state) => {
                              state.isEditing = false;
                              state.draft = "";
                            });
                          }, 300);
                        }}
                      >
                        {option.display}
                      </div>
                    );
                  })
              : this.renderEmpty()}
          </div>
          <Space height={8} />
          <div className={rowParted}>
            <span />
            <ThinButton type="primary" text={<Lingual text="submit" />} onClick={this.onSubmit} />
          </div>
        </div>
      </div>
    );
  }

  renderEmpty() {
    return <Lingual text="nothingToSelect" className={styleEmpty} />;
  }

  onSubmit = () => {
    this.props.onChange(this.state.draft, true);

    this.immerState((state) => {
      state.isEditing = false;
      state.draft = "";
    });
  };

  onClear = () => {
    this.props.onChange(null);

    setTimeout(() => {
      this.immerState((state) => {
        state.isEditing = false;
        state.draft = "";
      });
    }, 300);
  };
}

const styleValue = css`
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const styleEmpty = css`
  white-space: nowrap;
  color: #ccc;
  font-style: italic;
`;

const styleEditingArea = css`
  overflow: auto;
  padding-bottom: 16px;
`;

const styleContainer = css`
  display: inline-block;
  min-width: 64px;
  max-width: 320px;
  border: 1px solid #ddd;
  padding: 0 8px;
  border-radius: 2px;
  line-height: 32px;
  overflow: auto;
  background-color: white;
`;

const styleItem = css`
  padding: 8px 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
  overflow: auto;

  &:active,
  &:focus {
    background-color: #eee;
  }
`;

const styleItemSelected = css`
  background-color: #eee;
`;

const styleOutline = css`
  outline: 2px solid #aaf;
`;

const styleInput = css`
  outline: none;
  border: 1px solid #eee;
  line-height: 32px;
  padding: 0 16px;
  display: block;
  width: 100%;
`;

const styleInputWrapper = css`
  position: relative;
`;

const styleEraser = css`
  position: absolute;
  right: 8px;
  top: 2px;
`;

const styleDisabled = css`
  background-color: #f0f0f0;
`;

const styleMonoFont = css`
  font-family: Menlo, Roboto Mono, Ubuntu Mono, monospace;
`;

const styleCandidates = css``;
