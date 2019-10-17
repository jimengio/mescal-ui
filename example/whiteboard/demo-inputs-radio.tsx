import React, { useState } from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";
import { routeBack } from "../controller/generated-router";
import { Space } from "@jimengio/flex-styles";
import { EJimoIcon } from "@jimengio/jimo-icons";
import InputRadio, { InputRadioKind } from "../../src/input-radio";

interface IProps {}

interface IState {}

export default function DemoInputsRadio(props: IProps) {
  const [radio1, setRadio1] = useState("demo01");
  const [radio2, setRadio2] = useState(null);
  const [radio3, setRadio3] = useState(null);
  const [radio4, setRadio4] = useState(null);
  const [radio5, setRadio5] = useState("demo08");
  const [radio6, setRadio6] = useState(null);
  const [radio7, setRadio7] = useState(null);
  const [radio8, setRadio8] = useState("demo12");
  const [radio9, setRadio9] = useState("ok");

  return (
    <div className={styleContainer}>
      <div className={styleToolbar}>
        <a onClick={routeBack}>Back</a>
      </div>
      <Space height={16} />

      <div>
        <p>E01: value = "demo01"</p>
        <InputRadio
          name={"demo0102"}
          value={radio1}
          options={[{ label: "demo01", value: "demo01" }, { label: "demo02", value: "demo02" }]}
          onChange={(e) => setRadio1(e.target.value)}
        />
        <p>E02:</p>
        <InputRadio
          name={"demo0304"}
          value={radio2}
          options={[{ label: "demo03", value: "demo03" }, { label: "demo04", value: "demo04" }]}
          onChange={(e) => setRadio2(e.target.value)}
        />
        <p>E03: demo05 disabled (options)</p>
        <InputRadio
          name={"disable"}
          value={radio3}
          options={[{ label: "demo05", value: "demo05", disabled: true }, { label: "demo06", value: "demo06" }, { label: "demo07", value: "demo07" }]}
          onChange={(e) => setRadio3(e.target.value)}
        />
        <p>E04: all disabled</p>
        <InputRadio
          name={"all-disable"}
          disabled
          value={radio4}
          options={[{ label: "demo08", value: "demo08" }, { label: "demo09", value: "demo09" }]}
          onChange={(e) => setRadio4(e.target.value)}
        />
        <p>E05: all disabled and value = "demo08"</p>
        <InputRadio
          name={"all-disable-value-not-null"}
          disabled
          value={radio5}
          options={[{ label: "demo08", value: "demo08" }, { label: "demo09", value: "demo09" }]}
          onChange={(e) => setRadio5(e.target.value)}
        />
        <p>E06: kind = button</p>
        <InputRadio
          name={"button"}
          kind={InputRadioKind.Button}
          value={radio6}
          options={[{ label: "demo10", value: "demo10" }, { label: "demo11", value: "demo11" }]}
          onChange={(e) => setRadio6(e.target.value)}
        />
        <p>E07: kind = button, disabled</p>
        <InputRadio
          name={"button-disable"}
          kind={InputRadioKind.Button}
          disabled
          value={radio7}
          options={[{ label: "demo12", value: "demo12" }, { label: "demo13", value: "demo13" }]}
          onChange={(e) => setRadio7(e.target.value)}
        />
        <p>E08: kind = button, disabled, value="demo12"</p>
        <InputRadio
          name={"button-disable-value-not-null"}
          kind={InputRadioKind.Button}
          disabled
          value={radio8}
          options={[{ label: "demo12", value: "demo12" }, { label: "demo13", value: "demo13" }]}
          onChange={(e) => setRadio8(e.target.value)}
        />
        <p>E09: kind = button, custom activeColor, value="ok"</p>
        <InputRadio
          name={"button-activeColor"}
          kind={InputRadioKind.Button}
          value={radio9}
          options={[{ label: "合格", value: "ok", activeColor: "#49BC19" }, { label: "不合格", value: "ng", activeColor: "#f2536e" }]}
          onChange={(e) => setRadio9(e.target.value)}
        />
      </div>
    </div>
  );
}

const styleToolbar = css``;

const styleContainer = css`
  padding: 16px;
`;
