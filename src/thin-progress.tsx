import React from "react";
import { css, cx } from "emotion";

interface IProps {
  isProcessing: boolean;
  ratio: number;
  width?: number;
}

interface IState {}

const radius = 2;

export default class ThinProgress extends React.Component<IProps, IState> {
  render() {
    let { ratio, isProcessing } = this.props;
    let r2 = radius * 2;
    if (ratio < 0) {
      console.warn(`Ratio is ${ratio}, which is under 0`);
      ratio = 0;
    } else if (ratio > 100) {
      console.warn(`Ratio is ${ratio}, which is above 1`);
      ratio = 100;
    }

    return (
      <div className={cx(styleTrack, isProcessing ? styleProcessing : null)} style={{ width: this.props.width }}>
        <div className={styleThumb} style={{ width: `${ratio}%` }} />
      </div>
    );
  }
}

const styleTrack = css`
  background-color: #d9e7f8;
  transition-duration: 200ms;
  height: 8px;
  opacity: 0;
  pointer-events: none;
`;

const styleThumb = css`
  background-color: #a1a6ff;
  transition-duration: 200ms;
  height: 8px;
`;

const styleProcessing = css`
  pointer-events: normal;
  opacity: 1;
`;
