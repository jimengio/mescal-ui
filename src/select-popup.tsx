import React, { ReactNode } from "react";
import _ from "lodash";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";

import { rowParted, row, center, flex, column } from "@jimengio/shared-utils";
import Space from "./space";
import ThinButton from "./thin-button";
import FaIcon, { EFaIcon } from "@jimengio/fa-icons";
import { shellStylePopupBackground, shellStylePopupCard } from "./styles/shell";
import { Lingual, formatString, lingual } from "./lingual";
import { showInfoAlertMessage } from "./message/message-center";
// import { showInfoAlertMessage } from "controllers/alert-message";

let found = (x: string, y: string) => {
  return x.toLocaleLowerCase().includes(y.trim().toLowerCase());
};

export interface ISelectPopupItem {
  key?: string;
  display: any;
  value: any;
  searchText?: string;
}

interface IProps {
  value: string;
  guideText?: string;
  placeholder?: string;
  atRight?: boolean;
  noClear?: boolean;
  options: ISelectPopupItem[];
  onChange: (text: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
  disabledMessage?: string;
  maxPreviewWidth?: number;
}

interface IState {
  isEditing: boolean;
  query: string;
}

export default class SelectPopup extends React.Component<IProps, IState> {
  inputEl: HTMLInputElement;

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false, // debug
      query: "",
    };
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return (
      <div
        className={cx(styleContainer, this.state.isEditing ? styleOutline : null, this.props.disabled ? styleDisabled : null)}
        onClick={() => {
          if (this.props.disabled) {
            showInfoAlertMessage(this.props.disabledMessage || lingual.inputIsDisabled);
            return;
          }
          this.immerState((state) => {
            state.isEditing = true;
          });
        }}
      >
        {this.renderValue()}

        {this.state.isEditing ? this.renderEditor() : null}
      </div>
    );
  }

  renderValue() {
    let { options, value, placeholder, isLoading } = this.props;

    if (isLoading) {
      return this.renderValuePreview(styleEmpty, <Lingual text="loading" />);
    } else if (value != null) {
      return this.renderValuePreview(styleValue, this.displayValue(value));
    } else if (placeholder != null) {
      return this.renderValuePreview(styleEmpty, placeholder);
    } else if (_.isEmpty(options)) {
      return this.renderValuePreview(styleEmpty, <Lingual text="noCandidates" />);
    } else {
      return this.renderValuePreview(styleEmpty, <Lingual text="xCandidates" replaceData={{ x: options.length }} />);
    }
  }

  renderValuePreview(className: string, content: ReactNode) {
    let { atRight } = this.props;

    return (
      <div className={className} style={{ textAlign: atRight ? "right" : "left" }}>
        <div className={stylePreview} style={{ maxWidth: this.props.maxPreviewWidth }}>
          {content}
        </div>
        <Space width={8} />
        <FaIcon name={EFaIcon.AngleDown} />
      </div>
    );
  }

  displayValue(value: string) {
    let { options } = this.props;

    let target = options.find((x) => x.value === value);

    return target != null ? target.display : this.renderInvalid(value);
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
            {this.props.guideText || <Lingual text={"pleaseSelect"} />}

            {!this.props.noClear ? (
              <ThinButton
                onClick={() => {
                  this.props.onChange(null);

                  setTimeout(() => {
                    this.immerState((state) => {
                      state.isEditing = false;
                      state.query = "";
                    });
                  }, 300);
                }}
                text={<Lingual text="clear" />}
              />
            ) : null}
          </div>
          <Space height={8} />
          {this.props.options.length > 8 ? this.renderSearchBox() : null}
          <Space height={8} />

          <div className={flex}>{this.renderCandidates()}</div>
        </div>
      </div>
    );
  }

  renderCandidates() {
    if (this.props.options.length > 0) {
      return this.props.options
        .filter((option) => {
          if (_.isString(option.display)) {
            return found(option.display, this.state.query);
          } else if (_.isString(option.searchText)) {
            return found(option.searchText, this.state.query);
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
                    state.query = "";
                  });
                }, 300);
              }}
            >
              {option.display}
            </div>
          );
        });
    } else {
      return this.renderEmpty();
    }
  }

  renderEmpty() {
    return <Lingual text="nothingToSelect" className={styleEmpty} />;
  }

  renderInvalid(x) {
    return <span className={styleInvalid}>{x}</span>;
  }

  renderSearchBox() {
    return (
      <div className={styleInputWrapper}>
        <input
          value={this.state.query}
          placeholder={lingual.search}
          className={styleInput}
          onChange={(event) => {
            let text = event.target.value;
            this.immerState((state) => {
              state.query = text;
            });
          }}
        />
        {_.isEmpty(this.state.query) ? null : (
          <span
            className={styleEraser}
            onClick={() => {
              this.immerState((state) => {
                state.query = "";
              });
            }}
          >
            <FaIcon name={EFaIcon.Eraser} />
          </span>
        )}
      </div>
    );
  }
}

const styleValue = css`
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const styleInvalid = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: red;
`;

const styleEmpty = css`
  white-space: nowrap;
  color: #ccc;
  font-style: italic;
`;

const styleEditingArea = css`
  overflow: auto;
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

const stylePreview = css`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
`;
