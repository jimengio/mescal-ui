import React from "react";
import { css, cx } from "emotion";
import dayjs from "dayjs";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";
import { DatePickerView } from "antd-mobile";
import ThinButton from "./thin-button";
import Space from "./space";
import { row, rowParted, column } from "@jimengio/shared-utils";
import { shellStylePopupBackground, shellStylePopupCard } from "./styles/shell";

interface IProps {
  timeFrom: string;
  timeTo: string;
  onChange: (timeFrom: string, timeTo: string) => void;
}

interface IState {
  timeFrom: string;
  timeTo: string;

  isEditing: boolean;
  focused: "timeFrom" | "timeTo";
}

export default class RangePopup extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    let { timeFrom, timeTo } = this.props;

    this.state = {
      timeFrom: timeFrom,
      timeTo: timeTo,
      isEditing: false,
      focused: "timeFrom",
    };
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    let { timeFrom, timeTo } = this.props;
    let hasValue = timeFrom != null || timeTo != null;

    return (
      <div className={styleContainer}>
        <div
          onClick={() => {
            this.immerState((state) => {
              state.isEditing = true;
              state.timeFrom = this.props.timeFrom;
              state.timeTo = this.props.timeTo;
            });
          }}
        >
          {hasValue ? (
            <span>
              <span className={styleValue}>{timeFrom != null ? this.renderDate(timeFrom) : this.renderEmpty()}</span>
              {" ~ "}
              <span className={styleValue}>{timeTo != null ? this.renderDate(timeTo) : this.renderEmpty()}</span>
            </span>
          ) : (
            this.renderEmpty()
          )}
        </div>

        {this.state.isEditing ? this.renderEditor() : null}
      </div>
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
          className={cx(shellStylePopupCard)}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {this.renderDateValues()}
          <Space height={8} />
          <div className={rowParted}>
            <ThinButton
              text={"lang.pickNow"}
              onClick={() => {
                this.immerState((state) => {
                  if (state.focused === "timeFrom") {
                    state.timeFrom = new Date().toISOString();
                  } else {
                    state.timeTo = new Date().toISOString();
                  }
                });
              }}
            />
          </div>
          <Space height={16} />
          <DatePickerView
            value={this.getWorkingDate()}
            minDate={new Date("2017-01-01")}
            onChange={(x) => {
              this.immerState((state) => {
                if (state.focused === "timeFrom") {
                  state.timeFrom = x.toISOString();
                } else {
                  state.timeTo = x.toISOString();
                }
              });
            }}
            onValueChange={(x) => console.log("value change", x)}
          />
          <Space height={8} />
          <div className={rowParted}>
            <span />
            <div className={row}>
              <ThinButton
                disabled={!this.hasValue()}
                className={styleButton}
                onClick={() => {
                  this.immerState((state) => {
                    state.isEditing = false;
                    state.timeFrom = null;
                    state.timeTo = null;
                  });
                  this.props.onChange(null, null);
                }}
              >
                {"lang.clear"}
              </ThinButton>

              <Space width={16} />
              <ThinButton disabled={!this.hasValue()} type="primary" className={styleButton} onClick={this.onSubmit}>
                {"lang.submit"}
              </ThinButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderDateValues() {
    let { timeFrom, timeTo } = this.state;
    return (
      <div>
        <span
          className={cx(styleValue, this.state.focused === "timeFrom" ? styleSelected : null)}
          onClick={() => {
            this.immerState((state) => {
              state.focused = "timeFrom";
            });
          }}
        >
          {timeFrom ? this.renderDate(timeFrom) : this.renderEmpty()}
        </span>
        {" ~ "}
        <span
          className={cx(styleValue, this.state.focused === "timeTo" ? styleSelected : null)}
          onClick={() => {
            this.immerState((state) => {
              state.focused = "timeTo";
            });
          }}
        >
          {timeTo ? this.renderDate(timeTo) : this.renderEmpty()}
        </span>
      </div>
    );
  }

  renderEmpty() {
    return <span className={styleEmpty}>{"lang.pleaseSelect"}</span>;
  }

  renderDate(x) {
    if (x != null) {
      return dayjs(x).format("YYYY-MM-DD hh:mm");
    } else {
      null;
    }
  }

  hasValue() {
    let { timeFrom, timeTo } = this.state;
    return timeFrom != null || timeTo != null;
  }

  getWorkingDate() {
    if (this.state.focused === "timeFrom") {
      return this.state.timeFrom ? new Date(this.state.timeFrom) : null;
    } else {
      return this.state.timeTo ? new Date(this.state.timeTo) : null;
    }
  }

  onSubmit = () => {
    if (this.hasValue()) {
      this.immerState((state) => {
        state.isEditing = false;
      });
      this.props.onChange(this.state.timeFrom, this.state.timeTo);
    }
  };
}

const styleEmpty = css`
  color: #aaa;
  font-style: italic;
`;

const styleValue = css`
  display: inline-block;
  min-width: 120px;
  text-align: center;
  cursor: pointer;
  border: 1px solid transparent;
`;

const styleContainer = css`
  display: block;
  min-width: 80px;
  line-height: 32px;
  white-space: nowrap;

  border: 1px solid #ddd;
  padding: 0 8px;
  border-radius: 2px;
`;

const styleButton = css`
  padding: 0 8px;
`;

const styleSelected = css`
  border-color: #aaf;
`;
