import React, { ReactNode } from "react";
import produce from "immer";
import { css, cx } from "emotion";
import { center } from "@jimengio/shared-utils";

interface IProps {
  className?: string;
  dataSource: { [k: string]: any }[];
  labels: (string | ReactNode)[];
  renderColumns: (record: any, idx?: number) => (string | ReactNode)[];
}

interface IState {}

export default class RoughTable extends React.Component<IProps, IState> {
  render() {
    return (
      <div className={cx(styleContainer, this.props.className)}>
        <table className={styleTable}>
          <thead className={styleHeaderBar}>
            <tr>
              {this.props.labels.map((label, idx) => {
                return (
                  <th key={idx}>
                    <div className={styleCell}>{label}</div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={styleBody}>
            {this.props.dataSource.length > 0 ? (
              this.props.dataSource.map((record, idx) => {
                let cells = this.props.renderColumns(record, idx);
                return (
                  <tr key={idx} className={styleRow}>
                    {cells.map((cell, cellIdx) => {
                      return (
                        <td className={styleTd} key={cellIdx}>
                          <div className={styleCell}>{cell || <span className={styleEmptyCell}>_</span>}</div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className={styleTd} colSpan={this.props.labels.length}>
                  <div className={cx(center, styleEmpty)}>{"lang.noData"}</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const styleTable = css`
  width: 100%;
  font-size: 14px;
  border-collapse: collapse;
`;

const styleCell = css`
  padding: 12px 8px;
  text-align: left;
`;

const styleHeaderBar = css`
  background-color: #fafafa;
`;

const styleBody = css`
  color: rgba(0, 0, 0, 0.65);
`;

const styleRow = css`
  &:hover {
    background-color: #e6f7ff;
  }
`;

const styleEmpty = css`
  color: #ccc;
  padding: 16px;
`;

const styleEmptyCell = css`
  color: transparent;
`;

const styleContainer = css`
  width: 100%;
  overflow: auto;
  background-color: white;
`;

const styleTd = css`
  border-bottom: 1px solid #ccc;
`;
