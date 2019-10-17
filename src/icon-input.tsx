import React, { SFC, ReactNode } from "react";
import { css, cx } from "emotion";
import { rowMiddle, expand } from "@jimengio/shared-utils";
import FaIcon, { EFaIcon } from "@jimengio/fa-icons";
import { Space } from "@jimengio/flex-styles";
import { lingual } from "./lingual";

interface IProps {
  icon?: ReactNode;
  value: string;
  onChange: (text: string) => void;
  onEnter?: () => void;
}

let IconInput: SFC<IProps> = (props) => {
  return (
    <div className={cx(rowMiddle, styleContainer)}>
      {props.icon || <FaIcon name={EFaIcon.Search} className={styleIcon} />}
      <Space width={8} />
      <input
        className={cx(expand, styleInput)}
        placeholder={lingual.search}
        value={props.value}
        onChange={(event) => {
          props.onChange(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.keyCode === 13 && props.onEnter != null) {
            props.onEnter();
          }
        }}
      />
    </div>
  );
};

export default IconInput;

let styleContainer = css`
  background: rgba(242, 242, 242, 1);
  border-radius: 4px;
  height: 40px;
  padding: 8px 16px;
  font-size: 16px;
`;

let styleIcon = css`
  color: hsla(0, 0%, 59%, 1);
`;

let styleInput = css`
  background-color: transparent;
  border: none;
`;
