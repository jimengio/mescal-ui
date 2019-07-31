import React, { ReactNode } from "react";
import _ from "lodash";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";

import { lingual, formatString } from "./lingual";
import Space from "./space";
import FaIcon, { EFaIcon } from "@jimengio/fa-icons";
import { showInfoAlertMessage } from "./message/message-center";
import NavigatorSelect from "./navigator-select";

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
  options: ISelectPopupItem[];
  onChange: (text: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
  disabledMessage?: string;
  maxPreviewWidth?: number;
  navigatorTitle?: string;
  navigatorHint?: string;
}

interface IState {
  isEditing: boolean;
  query: string;
}

export default class SelectEntry extends React.Component<IProps, IState> {
  inputEl: HTMLInputElement;

  constructor(props: IProps) {
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
        {this.renderEditor()}
      </div>
    );
  }

  renderValue() {
    let { options, value, placeholder, isLoading } = this.props;

    if (isLoading) {
      return this.renderValuePreview(styleEmpty, lingual.loading);
    } else if (value != null) {
      return this.renderValuePreview(styleValue, this.displayValue(value));
    } else if (placeholder != null) {
      return this.renderValuePreview(styleEmpty, placeholder);
    } else if (_.isEmpty(options)) {
      return this.renderValuePreview(styleEmpty, lingual.noCandidates);
    } else {
      return this.renderValuePreview(styleEmpty, formatString(lingual.xCandidates, { x: options.length }));
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
      <NavigatorSelect
        visible={this.state.isEditing}
        title={this.props.navigatorTitle}
        hint={this.props.navigatorHint}
        onCancel={() => {
          this.mergeState({
            isEditing: false,
          });
        }}
        options={this.props.options}
        onSelect={(x) => {
          this.props.onChange(x);
          this.mergeState({ isEditing: false });
        }}
      />
    );
  }

  renderInvalid(x) {
    return <span className={styleInvalid}>{x}</span>;
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
