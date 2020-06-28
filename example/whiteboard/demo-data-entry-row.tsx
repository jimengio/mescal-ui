import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "../../src/utils/immer-helper";
import { routeBack } from "../controller/generated-router";
import { Space } from "@jimengio/flex-styles";
import DataEntryRow from "../../src/data-entry-row";
import FaIcon, { EFaIcon } from "@jimengio/fa-icons";

interface IProps {}

interface IState {}

export default class DemoDataEntryRow extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return (
      <div className={cx(styleContainer)}>
        <div className={styleToolbar}>
          <a onClick={routeBack}>Back</a>
        </div>
        <Space height={16} />

        {this.renderDemo()}
        {this.renderDemo()}
        {this.renderDemo()}
        {this.renderDemo()}
      </div>
    );
  }

  renderDemo() {
    return (
      <DataEntryRow
        icon={<FaIcon name={EFaIcon.Check} />}
        title="NC01 · 数控机床"
        hintText={
          <>
            张三
            <Space width={16} />
            2018-09-10 17:54 ~ 2018-09-10 18:00
          </>
        }
      />
    );
  }
}

const styleContainer = css`
  max-width: 480px;
  background-color: white;
`;

const styleToolbar = css`
  padding: 16px;
`;
