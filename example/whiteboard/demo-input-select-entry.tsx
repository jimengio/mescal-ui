import React, { SFC, useState } from "react";
import InputSelectPage from "../../src/input-select-page";
import { css } from "emotion";
import { LabelField } from "../../src";
import { Space } from "@jimengio/flex-styles";
import InputSelectEntry from "../../src/input-select-entry";

interface IProps {}

let DemoInputSelectEntry: SFC<IProps> = (props) => {
  let [value, setValue] = useState(null);
  let [visible, setVisible] = useState(false);
  let options = ["AAA", "BBB"];

  return (
    <div className={styleContainer}>
      <div
        onClick={() => {
          setVisible(true);
        }}
      >
        {value} ...Toggle
      </div>
      {visible ? (
        <div className={styleArea}>
          <InputSelectPage
            value={value}
            options={options}
            onCancel={() => {
              setVisible(false);
            }}
            onSelect={(x) => {
              console.log("Selected", x);
              setValue(x);
              setVisible(false);
            }}
          />
        </div>
      ) : null}
      <Space height={16} />
      <InputSelectEntry
        value={value}
        options={options}
        onChange={(x) => {
          setValue(x);
        }}
      />
      <Space height={16} />

      <LabelField>
        <InputSelectEntry
          value={value}
          atRight
          options={options}
          onChange={(x) => {
            setValue(x);
          }}
        />
      </LabelField>
    </div>
  );
};

export default DemoInputSelectEntry;

let styleContainer = css`
  padding: 16px;
`;

let styleArea = css`
  border: 1px solid #aaa;
`;
