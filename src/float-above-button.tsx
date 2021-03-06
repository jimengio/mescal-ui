import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "./utils/immer-helper";
import JimoIcon, { EJimoIcon } from "@jimengio/jimo-icons";
import { center } from "@jimengio/flex-styles";
import { EColorScheme } from "./utils/colors";

interface IProps {
  icon: EJimoIcon;
  onClick: () => void;
}

interface IState {}

export default class FloatAboveButton extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return (
      <button className={cx(center, styleButton)} onClick={this.props.onClick}>
        <JimoIcon name={this.props.icon} />
      </button>
    );
  }
}

const styleButton = css`
  position: absolute;
  width: 48px;
  height: 48px;
  bottom: 18px;
  left: calc(50% - 24px);
  background-color: ${EColorScheme.Purple};
  border-radius: 50%;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border: none;
`;
