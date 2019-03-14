import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";
import FaIcon, { IconName } from "@jimengio/fa-icons";
import { row } from "@jimengio/shared-utils";

import QrReader from "react-qr-reader";
import { shellStylePopupBackground } from "./styles/shell";

interface IProps {
  onDetect: (code: string) => void;
}

interface IState {
  isEditing: boolean;
  error: string;
}

export default class QrCodePopup extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      error: null,
    };
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return (
      <span
        onClick={() => {
          this.immerState((state) => {
            state.isEditing = true;
          });
        }}
      >
        <FaIcon name={IconName.Qrcode} />

        {this.state.isEditing ? this.renderEditor() : null}
      </span>
    );
  }

  renderEditor() {
    return (
      <div
        className={shellStylePopupBackground}
        onClick={(event) => {
          event.stopPropagation();
          this.immerState((state) => {
            state.isEditing = false;
          });
        }}
      >
        <div
          className={cx(row, styleEditingArea)}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {this.state.error != null ? <span className={styleError}>{this.state.error}</span> : null}
          <QrReader
            delay={500}
            onError={(error) => {
              console.error("QrReader error:", error);
              this.immerState((state) => {
                state.error = error.toString();
              });
            }}
            onScan={(code) => {
              if (code != null) {
                this.props.onDetect(code);
                this.immerState((state) => {
                  state.isEditing = false;
                });
              }
            }}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    );
  }
}

const styleEditingArea = css`
  margin: 48px auto;
  display: inline-flex;
  background-color: white;
  border: 4px solid #a88;
  width: 320px;
  height: 320px;

  position: relative;
`;

const styleError = css`
  padding: 16px;
  color: red;
  font-size: 16px;
`;

const styleClose = css`
  position: absolute;
  top: 8px;
  right: 8px;
  color: white;
  z-index: 200;
  font-size: 16px;
`;
