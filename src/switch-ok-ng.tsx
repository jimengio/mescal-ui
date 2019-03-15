import React from "react";
import { lingual } from "./lingual";
import InputRadio, { InputRadioKind, InputRadioType } from "./input-radio";
import { EJudgementResult } from "./models/types";

interface IProps {
  name: string;
  value: EJudgementResult;
  disabled?: boolean;
  className?: string;
  onChange: (EJudgementResult) => void;
}

export default function SwitchOkNg(props: IProps) {
  const { onChange, ...rest } = props;

  const options: InputRadioType[] = [
    {
      label: lingual.ok,
      value: EJudgementResult.Ok,
      activeColor: "#49BC19",
    },
    {
      label: lingual.ng,
      value: EJudgementResult.Ng,
      activeColor: "#f2536e",
    },
  ];

  return <InputRadio name={name} kind={InputRadioKind.Button} options={options} onChange={(e) => onChange(e.target.value)} {...rest} />;
}
