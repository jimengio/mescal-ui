import React from "react";
import { css, cx } from "emotion";
import { row, center } from "@jimengio/shared-utils";

interface IProps {
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}

interface IState {}

export default class ThinCheckbox extends React.Component<IProps, IState> {
  render() {
    return <input type="checkbox" className={styleCheckbox} checked={this.props.checked} onChange={this.onChange} />;
  }

  onChange = (event) => {
    if (this.props.disabled) {
      return;
    }
    this.props.onChange(!this.props.checked);
  };
}

const styleCheckbox = css`
  width: 16px;
  height: 16px;
  outline: none;
  cursor: pointer;
`;
