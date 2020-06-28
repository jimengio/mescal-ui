import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "../../src/utils/immer-helper";
import { routeBack } from "../controller/generated-router";
import { Space } from "@jimengio/flex-styles";
import LoadingPlaceholder from "../../src/loading-placeholder";
import EmptyPlaceholder from "../../src/empty-placeholder";

interface IProps {}

interface IState {}

export default class DemoPlaceholder extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return (
      <div className={cx(styleContainer)}>
        <div>
          <a onClick={routeBack}>Back</a>
        </div>
        <Space height={16} />
        <LoadingPlaceholder />
        <Space height={16} />
        <EmptyPlaceholder />
      </div>
    );
  }
}

const styleContainer = css`
  padding: 16px;
`;
