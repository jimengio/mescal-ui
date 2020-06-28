import React, { SFC, version, ReactNode, useState } from "react";
import NavigatorPage from "./navigator-page";
import { css, cx } from "emotion";
import { column, expand, rowMiddle } from "@jimengio/flex-styles";
import NavHeader from "./nav-header";
import LargeButton from "./large-button";
import { lingual, formatString } from "./lingual";
import IconInput from "./icon-input";
import { ISelectPopupItem } from "./select-popup";
import EmptyPlaceholder from "./empty-placeholder";

let found = (x: string, y: string) => {
  return x.toLocaleLowerCase().includes(y.trim().toLowerCase());
};

interface IProps {
  visible: boolean;
  title?: string;
  hint?: string;
  onCancel: () => void;

  options: ISelectPopupItem[];
  onSelect: (x: string) => void;
}

let renderList = (options: ISelectPopupItem[], props: IProps, setQuery: (x: string) => void): ReactNode => {
  return (
    <div className={cx(expand, styleList)}>
      {options.map((item) => {
        return (
          <div
            key={item.key || item.value}
            className={cx(rowMiddle, styleItem)}
            onClick={() => {
              props.onSelect(item.value);
              setQuery("");
            }}
          >
            {item.display}
          </div>
        );
      })}
    </div>
  );
};

let NavigatorSelect: SFC<IProps> = (props) => {
  let [query, setQuery] = useState("");

  let filteredOptions = props.options;
  if (query.trim().length > 0) {
    filteredOptions = filteredOptions.filter((item) => {
      return found(item.searchText || item.display, query);
    });
  }

  let emptyText: string = props.options.length === 0 ? lingual.noData : formatString(lingual.noMatchedResultsForX, { x: query });

  return (
    <NavigatorPage
      visible={props.visible}
      onClose={() => {
        props.onCancel();
        setQuery("");
      }}
      renderContent={() => {
        return (
          <div className={cx(column, styleFullSize)}>
            <NavHeader
              title={props.title || lingual.pleaseSelect}
              leftChild={
                <span
                  onClick={() => {
                    props.onCancel();
                    setQuery("");
                  }}
                >
                  {lingual.cancel}
                </span>
              }
            />
            <div className={cx(column, styleControlArea)}>
              <IconInput value={query} onChange={setQuery} />
              {props.hint != null ? <div className={styleHint}>{props.hint}</div> : null}
            </div>
            <div className={styleGray} />

            {filteredOptions.length === 0 ? <EmptyPlaceholder text={emptyText} /> : renderList(filteredOptions, props, setQuery)}
          </div>
        );
      }}
    />
  );
};

export default NavigatorSelect;

let styleFullSize = css`
  width: 100%;
  height: 100%;
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
