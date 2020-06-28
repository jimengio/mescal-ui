import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "./utils/immer-helper";

interface IProps {
  text: string;
  active: boolean;
  onClick: () => void;
}

interface IState {}

export default class TabButton extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return (
      <div
        onClick={() => {
          this.props.onClick();
        }}
        className={cx(styleButton, this.props.active ? styleActive : null)}
      >
        {this.props.text || "__TEXT__"}
      </div>
    );
  }
}

const styleButton = css`
  line-height: 32px;
  min-width: 92px;
  text-align: center;
  border-radius: 16px;
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
  display: inline-block;
  background-color: white;
  box-shadow: 0 0 1px hsla(0, 0%, 0%, 0.1);
  cursor: pointer;
`;

const styleActive = css`
  color: rgba(16, 16, 16, 1);
`;
