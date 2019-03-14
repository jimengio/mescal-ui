import React, { ReactNode, MouseEvent } from "react";
import _ from "lodash";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";

import { rowParted, row, center, flex, column, rowMiddle } from "@jimengio/shared-utils";
import Space from "./space";
import ThinButton from "./thin-button";
import FaIcon, { IconName } from "@jimengio/fa-icons";
import { shellStylePopupBackground, shellStylePopupCard } from "./styles/shell";
import { Id } from "models/types";

// folding tree component

interface ITreeBranchProps {
  value: any;
  item: ITreeSelectPopupItem;
  onChange: (valuel: any) => void;
  atRoot?: boolean;
  onlySelectLeaves: boolean;
}

interface ITreeBranchState {
  isExpanded: boolean;
}

class TreeBranch extends React.Component<ITreeBranchProps, ITreeBranchState> {
  constructor(props: ITreeBranchProps) {
    super(props);

    this.state = {
      isExpanded: true,
    };
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<ITreeBranchState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<ITreeBranchState>;

  render() {
    let { item } = this.props;

    return (
      <div>
        <div key={item.key || item.value} className={styleItemGroup}>
          <div className={cx(rowMiddle, styleItem, item.value === this.props.value ? styleItemSelected : null)}>
            <div className={styleToggler} onClick={this.onToggleExpanded}>
              {item.children.length > 0 ? (
                <FaIcon name={this.state.isExpanded ? IconName.AngleDown : IconName.AngleRight} />
              ) : (
                <FaIcon name={IconName.AngleDown} className={styleTogglerDisabled} />
              )}
            </div>
            <Space width={8} />
            <div
              className={flex}
              onClick={() => {
                if (this.props.onlySelectLeaves && item.children.length > 0) {
                  // disabled selection of branches
                  return;
                }
                this.onCandidateClick(item.value);
              }}
            >
              {item.display}
            </div>
          </div>
          <div className={styleChildContainer}>
            {this.state.isExpanded
              ? this.props.item.children.map((item) => {
                  return (
                    <TreeBranch
                      value={this.props.value}
                      item={item}
                      key={item.value}
                      onChange={this.props.onChange}
                      onlySelectLeaves={this.props.onlySelectLeaves}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </div>
    );
  }

  onToggleExpanded = (event: MouseEvent) => {
    event.stopPropagation();
    this.immerState((state) => {
      state.isExpanded = !state.isExpanded;
    });
  };

  onCandidateClick = (optionValue: any) => {
    this.props.onChange(optionValue);
  };
}

// main component

export interface ITreeSelectPopupItem {
  key?: string;
  display: any;
  value: any;
  children: ITreeSelectPopupItem[];
}

interface IProps {
  value: string;
  guideText?: string;
  placeholder?: string;
  atRight?: boolean;
  noClear?: boolean;
  options: ITreeSelectPopupItem[];
  onChange: (text: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
  disabledMessage?: string;
  maxPreviewWidth?: number;
  onlySelecLeaves?: boolean;
}

interface IState {
  isEditing: boolean;
}

export default class TreeSelectPopup extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isEditing: false, // debug
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
            // showInfoAlertMessage(this.props.disabledMessage || lang.inputIsDisabled);
            console.warn("TODO");
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
      return this.renderValuePreview(styleEmpty, "lang.loading");
    } else if (value != null) {
      return this.renderValuePreview(styleValue, this.displayValue(value));
    } else if (placeholder != null) {
      return this.renderValuePreview(styleEmpty, placeholder);
    } else if (_.isEmpty(options)) {
      return this.renderValuePreview(styleEmpty, "lang.noCandidates");
    } else {
      return this.renderValuePreview(styleEmpty, "lang.pleaseSelect");
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
        <FaIcon name={IconName.AngleDown} />
      </div>
    );
  }

  findInTree = (xs: ITreeSelectPopupItem[], x: Id) => {
    if (xs.length === 0) {
      return null;
    }

    let x0 = xs[0];
    if (x0.value === x) {
      return x0;
    }
    let childTarget = this.findInTree(x0.children, x);
    if (childTarget != null) {
      return childTarget;
    }
    return this.findInTree(xs.slice(1), x);
  };

  displayValue(value: string) {
    let { options } = this.props;

    let target = this.findInTree(options, this.props.value);

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
            {this.props.guideText || "lang.pleaseSelect"}

            {!this.props.noClear ? <ThinButton onClick={this.onClear} text={"lang.clear"} /> : null}
          </div>
          <Space height={8} />
          {this.props.options.length > 0 ? (
            <div className={flex}>
              {this.props.options.map((item) => {
                return (
                  <TreeBranch
                    key={item.value}
                    value={this.props.value}
                    onChange={(value) => {
                      this.props.onChange(value);
                      this.delayToggleEditing(false);
                    }}
                    item={item}
                    atRoot={true}
                    onlySelectLeaves={this.props.onlySelecLeaves}
                  />
                );
              })}
            </div>
          ) : (
            this.renderEmpty()
          )}
        </div>
      </div>
    );
  }

  renderEmpty() {
    return <span className={styleEmpty}>{"lang.nothingToSelect"}</span>;
  }

  renderInvalid(x) {
    return <span className={styleInvalid}>{x}</span>;
  }

  onClear = () => {
    this.props.onChange(null);

    this.delayToggleEditing(false);
  };

  delayToggleEditing = (x: boolean) => {
    setTimeout(() => {
      this.immerState((state) => {
        state.isEditing = x;
      });
    }, 300);
  };
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
  padding: 8px 4px;
  text-align: left;
  border-bottom: 1px solid #eee;
`;

const styleItemSelected = css`
  background-color: #eee;
`;

const styleOutline = css`
  outline: 2px solid #aaf;
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

const styleItemGroup = css``;

const styleToggler = css`
  min-width: 32px;
  font-size: 16px;
  text-align: center;
`;

const styleChildContainer = css`
  padding-left: 12px;
`;

const styleTogglerDisabled = css`
  cursor: default;
  color: #ddd;
`;
