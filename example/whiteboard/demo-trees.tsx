import React from "react";
import _ from "lodash";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";
import LabelField from "../../src/label-field";
import TreeSelectPopup, { ITreeSelectPopupItem } from "../../src/tree-select-popup";
import { routeBack } from "../controller/generated-router";
import Space from "../../src/space";

interface IProps {}

interface IState {
  x: string;
  disabled: boolean;
}

let generateTreeOptions = (n: number): ITreeSelectPopupItem[] => {
  return _.range(10 - 2 * n).map((idx) => {
    let x = `${_.range(idx)
      .map(() => "a")
      .join("")}${idx}`;
    return {
      value: x,
      display: x,
      children: n < 6 ? generateTreeOptions(n + 1).slice(0, idx) : undefined,
    };
  });
};

let options = generateTreeOptions(0);

export default class DemoTrees extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      x: null,
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

        {this.renderSelectDemo()}
      </div>
    );
  }

  renderSelectDemo() {
    return (
      <LabelField>
        <TreeSelectPopup
          value={this.state.x}
          disabled={this.state.disabled}
          atRight={true}
          options={options}
          onChange={(text: string) => {
            this.immerState((state) => {
              state.x = text;
            });
          }}
        />
      </LabelField>
    );
  }
}

const styleContainer = css`
  background-color: white;
  padding: 16px;
`;
