import React from "react";
import { css, cx } from "emotion";
import produce from "immer";
import dayjs from "dayjs";

interface IProps {
  time: string;
  format?: string;
}

interface IState {}

let defaultTimeFormat = "YYYY-MM-DD HH:mm";

export default class TimeFormat extends React.Component<IProps, IState> {
  render() {
    let format = this.props.format || defaultTimeFormat;
    let { time } = this.props;

    let dateObject = dayjs(time);
    if (dateObject.isValid()) {
      return <span>{dateObject.format(format)}</span>;
    } else {
      console.warn("Invalid format time", time, dateObject);
      return <span>{time}</span>;
    }
  }
}

export function renderTimeInFormat(time: string, format?: string) {
  format = format || defaultTimeFormat;

  let dateObject = dayjs(time);
  if (dateObject.isValid()) {
    return dateObject.format(format);
  } else {
    console.warn("Invalid format time", time, dateObject);
    return time;
  }
}
