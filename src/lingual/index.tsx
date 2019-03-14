import React, { SFC, useContext, ReactNode } from "react";
import { zhCN } from "./zhCN";
import { ILang } from "./interface";
import { enUS } from "./enUS";
import { ISimpleObject } from "../models/types";

// default locale is Chinese
export let lingual = zhCN;

export function mescalUseZh() {
  lingual = zhCN;
}

export function mescalUseEn() {
  lingual = enUS;
}

// Component for rendering local

interface ILocaleProps {
  text: keyof ILang;
  className?: string;
  replaceData?: ISimpleObject;
}

// by using a component, there's a way to read context.
export let Lingual: SFC<ILocaleProps> = (props) => {
  let text = lingual[props.text];
  if (props.replaceData != null) {
    text = formatString(text, props.replaceData);
  }
  return <span className={props.className}>{text}</span>;
};

export function formatString(template: string, data: ISimpleObject) {
  if (!template) {
    throw new Error("Parameter 'template' is required.");
  }

  if (!data) {
    throw new Error("Parameter 'data' is required.");
  }

  for (var key in data) {
    template = template.replace(new RegExp("{" + key + "}", "gi"), data[key]);
  }

  return template;
}
