import React from "react";
import _ from "lodash";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";
import { routeBack } from "../controller/generated-router";
import { Space } from "@jimengio/flex-styles";
import LabelField from "../../src/label-field";
import LabelFieldVertical from "../../src/label-field-vertical";
import { Switch } from "antd-mobile";
import FormSectionTitle from "../../src/form-section-title";
import InputInline from "../../src/input-inline";
import NumberInline from "../../src/number-inline";
import TextareaInline from "../../src/textarea-inline";

interface IProps {}

interface IState {
  text: string;
  paragraph: string;
  selected: any;
  size: number;
  disabled: boolean;
}

export default class WhiteboardDemoInputsInline extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      text: "demo",
      paragraph: "paragraph 1\nparagraph 2",
      selected: null,
      size: 2,
      disabled: false,
    };
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return (
      <div className={styleContainer}>
        <div>
          <a onClick={routeBack}>Back</a>
        </div>
        <Space height={16} />
        {"Test page for input popups "}
        <Switch
          checked={this.state.disabled}
          onChange={(value) => {
            this.immerState((state) => {
              state.disabled = !state.disabled;
            });
          }}
        />
        <Space height={16} />
        <div className={styleDemoArea}>
          <FormSectionTitle title={"Inline fields"} />
          {this.renderInputInlineDemo()}
          {this.renderNumberInlineDemo()}
          {this.renderTextareaDemo()}
        </div>
        <Space height={16} />
      </div>
    );
  }

  renderInputInlineDemo() {
    return (
      <LabelField label={"Basic input"} underline>
        <InputInline
          value={this.state.text}
          atRight={true}
          disabled={this.state.disabled}
          onChange={(text: string) => {
            this.immerState((state) => {
              state.text = text;
            });
          }}
        />
      </LabelField>
    );
  }

  renderNumberInlineDemo() {
    return (
      <>
        <LabelField label={"Basic number"} underline>
          <NumberInline
            value={this.state.size}
            atRight={true}
            disabled={this.state.disabled}
            onChange={(x: number) => {
              this.immerState((state) => {
                state.size = x;
              });
            }}
          />
        </LabelField>
        <LabelField label={"value is:"}>{this.state.size}</LabelField>
      </>
    );
  }

  renderTextareaDemo() {
    return (
      <LabelFieldVertical label={"Long text"} normalSize={true}>
        <TextareaInline
          value={this.state.paragraph}
          disabled={this.state.disabled}
          fullWidth
          onChange={(text: string) => {
            this.immerState((state) => {
              state.paragraph = text;
            });
          }}
        />
      </LabelFieldVertical>
    );
  }
}

const styleContainer = css`
  background-color: white;
  padding: 16px;
`;

const styleDemoArea = css`
  border: 1px solid #ddd;

  width: auto;
  max-width: 400px;
`;
