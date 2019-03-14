import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";
import { routeBack } from "../controller/generated-router";
import Space from "../../src/space";
import ThinButton from "../../src/thin-button";
import LargeButton from "../../src/large-button";
import FloatAboveButton from "../../src/float-above-button";
import { EJimoIcon } from "@jimengio/jimo-icons";

interface IProps {}

interface IState {}

export default class DemoButtons extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return (
      <div className={styleContainer}>
        <div className={styleToolbar}>
          <a onClick={routeBack}>Back</a>
        </div>
        <Space height={16} />

        <div>
          <ThinButton onClick={() => {}} />
          <Space width={8} />
          <ThinButton type="primary" onClick={() => {}} />
          <Space width={8} />
          <ThinButton disabled type="primary" onClick={() => {}} />
        </div>

        <Space height={16} />

        <div>
          <LargeButton />
        </div>

        <FloatAboveButton icon={EJimoIcon.plus} onClick={() => {}} />
      </div>
    );
  }
}

const styleToolbar = css``;

const styleContainer = css`
  padding: 16px;
  background-color: #f0f6ff;
`;
