import React, { useState } from "react";
import { css, cx } from "emotion";
import { routeBack } from "../controller/generated-router";
import { Space } from "@jimengio/flex-styles";
import SwitchOkNg from "../../src/switch-ok-ng";
import { EJudgementResult } from "../../src/models/types";

export function DemoSwitchOkNg() {
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(EJudgementResult.Ok);
  const [value3, setValue3] = useState(null);

  return (
    <div className={styleContainer}>
      <div className={styleToolbar}>
        <a onClick={routeBack}>Back</a>
      </div>
      <Space height={16} />

      <div>
        <p>E01: normal</p>
        <SwitchOkNg
          name={"demo01"}
          value={value1}
          onChange={(value) => {
            console.log(value);
            setValue1(value);
          }}
        />

        <Space height={16} />

        <p>E02: disabled</p>
        <SwitchOkNg
          name={"demo02"}
          value={value2}
          disabled
          onChange={setValue2}
        />

        <Space height={16} />

        <p>E03: ClassName</p>
        <span>inline-block</span>
        <SwitchOkNg
          name={"demo03"}
          value={value3}
          className={styleInlineBlock}
          onChange={setValue3}
        />
      </div>
    </div>
  );
}

const styleToolbar = css``;

const styleContainer = css`
  padding: 16px;
`;

const styleInlineBlock = css`
  display: inline-block;
`;
