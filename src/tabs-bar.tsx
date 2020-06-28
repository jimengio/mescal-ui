import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "./utils/immer-helper";
import { rowCenter } from "@jimengio/flex-styles";
import { EColorScheme } from "./utils/colors";

export interface ICandidate {
  value: string;
  display: string;
}

interface IProps {
  className?: string;
  theme?: "dark" | "bright";
  value: string;
  onChange: (tab: string) => void;
  candidates: ICandidate[];
}

interface IState {}

export default class TabsBar extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    let themeColors = {
      background: EColorScheme.Purple,
      foreground: EColorScheme.White,
    };
    let theme = this.props.theme || "dark";
    if (theme === "bright") {
      themeColors = {
        background: EColorScheme.White,
        foreground: EColorScheme.Purple,
      };
    }

    return (
      <div className={cx(rowCenter, styleContainer, this.props.className)} style={{ backgroundColor: themeColors.background }}>
        {this.props.candidates.map((candidate, index) => {
          let isSelected = this.props.value === candidate.value;
          return (
            <div
              key={index}
              className={cx(styleCandidate)}
              onClick={() => {
                this.props.onChange(candidate.value);
              }}
              style={{ color: isSelected ? themeColors.foreground : null }}
            >
              {candidate.display}

              {isSelected ? <div className={styleSelectedBorder} style={{ backgroundColor: themeColors.foreground }} /> : null}
            </div>
          );
        })}
      </div>
    );
  }
}

const styleContainer = css`
  height: 32px;
  align-items: flex-end;
`;

const styleCandidate = css`
  min-width: 80px;
  color: white;
  text-align: center;
  position: relative;
  line-height: 32px;
  cursor: pointer;
  color: #cccccc;
`;

const styleSelectedBorder = css`
  position: absolute;
  bottom: -1px;
  height: 3px;
  left: 0;
  right: 0;
`;
