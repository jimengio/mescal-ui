import React, { SFC, useState, ReactNode } from "react";
import { NavHeader, EmptyPlaceholder } from ".";
import { cx, css } from "emotion";
import { column, expand, rowMiddle } from "@jimengio/flex-styles";
import { lingual, formatString } from "./lingual";

let found = (x: string, y: string) => {
  return x.toLocaleLowerCase().includes(y.trim().toLowerCase());
};

interface IProps {
  value: string;
  title?: string;
  hint?: string;
  placeholder?: string;
  onCancel: () => void;

  options: string[];
  onSelect: (x: string) => void;
}

let renderList = (options: string[], props: IProps, setDraft: (x: string) => void): ReactNode => {
  return (
    <div className={cx(expand, styleList)}>
      {options.map((item) => {
        return (
          <div
            key={item}
            className={cx(rowMiddle, styleItem)}
            onClick={() => {
              props.onSelect(item);
              setDraft("");
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

let InputSelectPage: SFC<IProps> = (props) => {
  let [draft, setDraft] = useState(props.value || "");

  let filteredOptions = props.options;
  if (draft.trim().length > 0) {
    filteredOptions = filteredOptions.filter((item) => {
      return found(item, draft);
    });
  }

  let emptyText = filteredOptions.length === 0 ? formatString(lingual.noMatchedResultsForX, { x: draft }) : undefined;

  return (
    <div className={cx(column, styleContainer)}>
      <NavHeader
        title={props.title || lingual.pleaseSelect}
        leftChild={
          <span
            onClick={() => {
              props.onCancel();
              setDraft("");
            }}
          >
            {lingual.cancel}
          </span>
        }
        rightChild={
          <span
            onClick={() => {
              if (draft != null && draft.trim() !== "") {
                props.onSelect(draft);
                setDraft("");
              }
            }}
          >
            {lingual.confirm}
          </span>
        }
      />
      <div className={cx(column, styleControlArea)}>
        <input
          className={styleInput}
          placeholder={props.placeholder || lingual.pleaseInput}
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.keyCode === 13) {
              props.onSelect(draft);
            }
          }}
        />
        {props.hint != null ? <div className={styleHint}>{props.hint}</div> : null}
      </div>
      <div className={styleGray} />

      {filteredOptions.length === 0 ? <EmptyPlaceholder text={emptyText} /> : renderList(filteredOptions, props, setDraft)}
    </div>
  );
};

export default InputSelectPage;

let styleContainer = css`
  width: 100%;
  height: 100%;
  background-color: white;
`;

let styleControlArea = css`
  padding: 12px;
`;

const styleGray = css`
  height: 12px;
  background: rgba(242, 242, 242, 1);
`;

const styleHint = css`
  margin-top: 12px;
`;

const styleList = css`
  overflow: auto;
  padding-bottom: 60px;
`;

const styleItem = css`
  height: 60px;
  padding: 8px 12px;
  border-bottom: 1px solid rgba(245, 245, 245, 1);
  width: 100%;
  word-wrap: normal;
  word-break: break-all;
  font-size: 16px;
`;

const styleInput = css`
  background-color: hsla(0, 0%, 95%, 1);
  height: 40px;
  line-height: 24px;
  padding: 8px 16px;
  border: none;
`;
