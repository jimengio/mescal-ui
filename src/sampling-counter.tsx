import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";
import { column, rowParted, row, center } from "@jimengio/shared-utils";
import FaIcon, { EFaIcon } from "@jimengio/fa-icons";
import { Space } from "@jimengio/flex-styles";

interface IProps {
  selectedIndex: number;
  sampleSize: number;
  maxSize?: number;
  onChange: (selectedIndex: number) => void;
}

interface IState {}

export default class SamplingCounter extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    let { selectedIndex, sampleSize } = this.props;
    let noSamples = sampleSize === 0;
    return (
      <div className={cx(rowParted, styleContainer)}>
        <div>
          <FaIcon
            className={cx(styleIcon, selectedIndex === 0 || noSamples ? styleDisabled : null)}
            name={EFaIcon.AngleLeft}
            onClick={this.onSelectPrevious}
          />
          <Space width={24} />
          <FaIcon
            className={cx(styleIcon, selectedIndex + 1 === sampleSize || noSamples ? styleDisabled : null)}
            name={EFaIcon.AngleRight}
            onClick={this.onSelectNext}
          />
        </div>

        <div>
          <span className={stylePageValue}>{`${selectedIndex + 1}/${sampleSize}`}</span>
          <Space width={16} />
        </div>
      </div>
    );
  }

  onSelectNext = () => {
    if (this.props.selectedIndex + 1 < this.props.sampleSize) {
      this.props.onChange(this.props.selectedIndex + 1);
    }
  };

  onSelectPrevious = () => {
    if (this.props.selectedIndex > 0) {
      this.props.onChange(this.props.selectedIndex - 1);
    }
  };
}

const styleCell = css`
  line-height: 40px;
  height: 40px;
  width: 48px;
  border-radius: 4px;
  border: 1px solid #113b6e;
`;

const styleIcon = css`
  font-size: 24px;
  font-weight: bold;
  margin: 0 8px;
`;

const styleContainer = css`
  padding: 0 8px;
  font-size: 16px;
`;

const stylePageValue = css`
  font-family: Menlo, Roboto Mono, Ubuntu Mono, monospace;
`;

const styleButtonPair = css`
  display: inline-flex;
`;

const styleLeftOne = css`
  border-radius: 4px 0 0 4px;
  border-right-width: 0;
`;
const styleRightOne = css`
  border-radius: 0 4px 4px 0;
`;

const styleDisabled = css`
  color: #aaa;
`;
