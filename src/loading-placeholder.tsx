import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";
import { ActivityIndicator } from "antd-mobile";
import { center } from "@jimengio/shared-utils";

interface IProps {
  className?: string;
}

interface IState {}

export default class LoadingPlaceholder extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return (
      <div className={cx(center, styleContainer, this.props.className)}>
        <ActivityIndicator />
      </div>
    );
  }
}

const styleContainer = css`
  padding: 16px;
`;
