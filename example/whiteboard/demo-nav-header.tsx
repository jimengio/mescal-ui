import React from "react";
import NavHeader from "../../src/nav-header";
import { column } from "@jimengio/shared-utils";
import { Space } from "../../lib";
import { ArrowBack } from "../../src";
import JimoIcon, { EJimoIcon } from "@jimengio/jimo-icons";

export default function DemoNavHeader() {
  return (
    <div className={column}>
      <NavHeader title="首页" />
      <Space height={16} />
      <NavHeader
        title="首页"
        leftChild={
          <ArrowBack
            onClick={() => {
              console.log("clicked");
            }}
          />
        }
      />
      <Space height={16} />
      <NavHeader title="首页" rightChild={<JimoIcon name={EJimoIcon.application} />} />
    </div>
  );
}
