import React from "react";
import _ from "lodash";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";
import { routeBack } from "../controller/generated-router";
import Space from "../../src/space";
import InputPopup from "../../src/input-popup";
import TextareaPopup from "../../src/textarea-popup";
import ThinDivider from "../../src/thin-divider";
import LabelField from "../../src/label-field";
import SelectPopup from "../../src/select-popup";
import InputSelectPopup from "../../src/input-select-popup";
import NumberPopup from "../../src/number-popup";
import LabelFieldVertical from "../../src/label-field-vertical";
import { Switch } from "antd-mobile";
import FormSectionTitle from "../../src/form-section-title";
import { materialSelectItems } from "../data/material-items";
import SelectEntry from "../../src/select-entry";

interface IProps {}

interface IState {
  text: string;
  paragraph: string;
  selected: any;
  size: number;
  disabled: boolean;
}

export default class WhiteboardDemoInput extends React.Component<IProps, IState> {
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
          <FormSectionTitle title={"DEMO"} />
          {this.renderInputDemo()}
          <ThinDivider />
          {this.renderSelectDemo()}
          <ThinDivider />
          {this.renderSelectEntry()}
          <ThinDivider />
          {this.renderSelectInputDemo()}
          <ThinDivider />
          {this.renderInputVerticalDemo()}
          <ThinDivider />
          {this.renderSelectLoadingDemo()}
          <ThinDivider />
          {this.renderSelectVerticalDemo()}
          <ThinDivider />
          {this.renderNumberDemo()}
          <ThinDivider />
          {this.renderTextareaDemo()}
        </div>
        <Space height={16} />
      </div>
    );
  }

  renderSelectDemo() {
    let options = _.range(80).map((idx) => {
      let x = `${_.range(idx)
        .map(() => "a")
        .join("")}${idx}`;
      return {
        value: x,
        display: x,
      };
    });
    return (
      <LabelField>
        <SelectPopup
          value={this.state.selected}
          disabled={this.state.disabled}
          atRight={true}
          options={options}
          onChange={(text: string) => {
            this.immerState((state) => {
              state.selected = text;
            });
          }}
        />
      </LabelField>
    );
  }

  renderSelectEntry() {
    return (
      <LabelField label={"Navigator select"}>
        <SelectEntry
          value={this.state.selected}
          disabled={this.state.disabled}
          atRight={true}
          options={materialSelectItems}
          onChange={(text: string) => {
            this.immerState((state) => {
              state.selected = text;
            });
          }}
        />
      </LabelField>
    );
  }

  renderSelectLoadingDemo() {
    return (
      <LabelField>
        <SelectPopup
          value={this.state.selected}
          disabled={this.state.disabled}
          atRight={true}
          options={[]}
          isLoading={true}
          onChange={(text: string) => {
            this.immerState((state) => {
              state.selected = text;
            });
          }}
        />
      </LabelField>
    );
  }

  renderSelectInputDemo() {
    let options = _.range(80).map((idx) => {
      let x = `${_.range(idx)
        .map(() => "a")
        .join("")}${idx}`;
      return {
        value: x,
        display: x,
      };
    });
    return (
      <LabelField label={"带文本输入的选择"}>
        <InputSelectPopup
          value={this.state.selected}
          disabled={this.state.disabled}
          atRight={true}
          options={options}
          onChange={(text: string) => {
            this.immerState((state) => {
              state.selected = text;
            });
          }}
        />
      </LabelField>
    );
  }

  renderSelectVerticalDemo() {
    let options = _.range(80).map((idx) => {
      let x = `${_.range(idx)
        .map(() => "a")
        .join("")}${idx}`;
      return {
        value: x,
        display: x,
      };
    });
    return (
      <LabelFieldVertical>
        <SelectPopup
          value={this.state.selected}
          atRight={false}
          options={options}
          disabled={this.state.disabled}
          onChange={(text: string) => {
            this.immerState((state) => {
              state.selected = text;
            });
          }}
        />
      </LabelFieldVertical>
    );
  }

  renderInputDemo() {
    return (
      <LabelField>
        <InputPopup
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

  renderInputVerticalDemo() {
    return (
      <LabelFieldVertical>
        <InputPopup
          value={this.state.text}
          atRight={false}
          disabled={this.state.disabled}
          onChange={(text: string) => {
            this.immerState((state) => {
              state.text = text;
            });
          }}
        />
      </LabelFieldVertical>
    );
  }

  renderNumberDemo() {
    return (
      <LabelField isRequired={true}>
        <NumberPopup
          value={this.state.size}
          atRight={true}
          disabled={this.state.disabled}
          validate={(x) => {
            if (x > 10 && x < 100) {
              return { ok: true, message: null };
            } else {
              return { ok: false, message: "not match 10 < x < 100" };
            }
          }}
          onChange={(text: number) => {
            this.immerState((state) => {
              state.size = text;
            });
          }}
        />
      </LabelField>
    );
  }

  renderTextareaDemo() {
    return (
      <LabelFieldVertical normalSize={true}>
        <TextareaPopup
          value={this.state.paragraph}
          atRight={false}
          disabled={this.state.disabled}
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
