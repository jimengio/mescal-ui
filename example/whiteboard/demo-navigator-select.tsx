import React, { useState } from "react";
import { range } from "lodash-es";
import { css } from "emotion";
import NavigatorSelect from "../../src/navigator-select";
import { materialSelectItems } from "../data/material-items";

let options = range(80).map((idx) => {
  let x = `${range(idx)
    .map(() => "a")
    .join("")}${idx}`;
  return {
    value: x,
    display: x,
  };
});

export function DemoNavigatorSelect() {
  let [visible, setVisible] = useState(true);
  return (
    <div className={styleContainer}>
      <div
        onClick={() => {
          setVisible(!visible);
        }}
      >
        Toggle
      </div>

      <NavigatorSelect
        visible={visible}
        title="TODO"
        onCancel={() => {
          setVisible(false);
        }}
        options={materialSelectItems}
        onSelect={(x) => {
          console.log("selected", x);
          setVisible(false);
        }}
      />
    </div>
  );
}

let styleContainer = css`
  padding: 16px;
`;
