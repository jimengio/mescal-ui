import React, { CSSProperties } from "react";
import { css, cx } from "emotion";
import { center } from "@jimengio/shared-utils";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";
import { EColorScheme } from "./utils/colors";

declare type InputRadioValue = string | number;
export enum InputRadioKind {
  Normal = "normal",
  Button = "button",
}

export interface InputRadioType {
  label: React.ReactNode;
  value: InputRadioValue;
  disabled?: boolean;
  activeColor?: string; // for kind: btn
}

interface IRadioProps {
  name?: string;
  label: React.ReactNode;
  value: InputRadioValue;
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  style?: CSSProperties;
  activeStyle?: CSSProperties;
  className?: string;
  labelClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Radio(props: IRadioProps) {
  const { name, label, value, checked, disabled, id, style, activeStyle, className, labelClassName, onChange } = props;

  return (
    <label className={cx(styleRadio, labelClassName)}>
      <input type="radio" hidden name={name} id={id || value.toString()} value={value} checked={checked} disabled={disabled} onChange={onChange} />
      <span className={cx(styleRadioItem, disabled && styleDisable, className)} style={checked ? Object.assign({}, style, activeStyle) : style}>
        {label}
      </span>
    </label>
  );
}

interface IRadioBtnProps extends IRadioProps {
  activeColor?: string;
}

export function RadioBtn(props: IRadioBtnProps) {
  const { activeColor, className, labelClassName, style, activeStyle, ...rest } = props;
  const customActiveStyle: CSSProperties = { background: activeColor, borderColor: activeColor };
  const checkedDisabledStyle: CSSProperties = { opacity: 0.6 };

  return (
    <Radio
      className={cx(styleRadioBtnItem, props.disabled && styleDisableBtn, className)}
      labelClassName={cx(styleRadioBtn, labelClassName)}
      style={props.checked && props.disabled ? checkedDisabledStyle : {}}
      activeStyle={customActiveStyle}
      {...rest}
    />
  );
}

interface IProps {
  name: string;
  value: InputRadioValue;
  options: InputRadioType[];
  disabled?: boolean;
  kind?: InputRadioKind;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputRadio(props: IProps) {
  const { name, value, options, disabled, kind, className, onChange } = props;

  return (
    <div className={cx(styleContainer, className)}>
      {kind === InputRadioKind.Button
        ? options.map((item, index) => (
            <RadioBtn
              key={`${value}${index}`}
              name={name}
              label={item.label}
              value={item.value}
              disabled={disabled || item.disabled}
              checked={value === item.value}
              activeColor={item.activeColor}
              onChange={onChange}
            />
          ))
        : options.map((item, index) => (
            <Radio
              key={`${value}${index}`}
              name={name}
              label={item.label}
              value={item.value}
              disabled={disabled || item.disabled}
              checked={value === item.value}
              onChange={onChange}
            />
          ))}
    </div>
  );
}

const styleContainer = css``;

const styleRadio = css`
  display: inline-block;
  margin: 0 0 0 8px;
  padding: 0;
  cursor: pointer;

  &:first-of-type {
    margin-left: 0;
  }

  & input[type="radio"]:checked + span {
    &::before {
      content: "";
      position: absolute;
      left: 4px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: ${EColorScheme.Purple};
    }
    &::after {
      border-color: ${EColorScheme.Purple};
    }
  }
`;

const styleRadioBtn = css`
  & input[type="radio"]:checked + span {
    color: #fff;
    background: ${EColorScheme.Purple};
    border-color: ${EColorScheme.Purple};
  }
`;

const styleRadioItem = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 0 24px;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: 16px;
    height: 16px;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
`;

const styleDisable = css`
  color: ${EColorScheme.Empty};

  &::after,
  &::before {
    opacity: 0.6;
  }
`;

const styleDisableBtn = css`
  color: #999;
  border-color: #eee;
  background-color: #eee;
`;

const styleRadioBtnItem = css`
  height: 30px;
  min-width: 60px;
  padding: 0 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #bdbdbd;
  border-color: #bdbdbd;
  background: #fff;

  &::after,
  &::before {
    display: none;
  }
`;
