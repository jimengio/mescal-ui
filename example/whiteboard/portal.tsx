import React from "react";
import { css, cx } from "emotion";
import produce from "immer";
import { IRouteParseResult } from "@jimengio/ruled-router";

import DemoInput from "./demo-input";
import DemoRangePicker from "./demo-range-picker";
import { center, row, fullscreen, column, flex } from "@jimengio/shared-utils";
import { Nav } from "../models/router-rules";
import DemoQrCode from "./demo-qr-code";
import DemoProgress from "./demo-progress";
import DemoSamplingCounter from "./demo-sampling-counter";
import DemoTabsBar from "./demo-tabs-bar";
import DemoDataEntryRow from "./demo-data-entry-row";
import DemoButtons from "./demo-buttons";
import DemoPlaceholder from "./demo-placeholder";
import DemoAlertMessages from "./demo-alert-messages";
import { genRouter } from "../controller/generated-router";
import WhiteboardDemoInputsInline from "./demo-inputs-inine";
import DemoTrees from "./demo-trees";

interface IProps {
  router: IRouteParseResult;
}

interface IState {}

export default class WhiteboardPortal extends React.Component<IProps, IState> {
  render() {
    let { router } = this.props;

    let routePage = genRouter.whiteboard;

    if (router == null) {
      return (
        <div className={cx(fullscreen, column)}>
          <div className={styleToolbar}>
            <a onClick={genRouter.home.go}>{"Back"}</a>
          </div>
          <div className={cx(flex, styleContainer)}>
            <div className={styleTitle}>Pinned</div>
            {this.renderEntry("Tabs bar", routePage.tabsBar.go)}
            {this.renderEntry("Plan form table", routePage.planDetailTable.go)}
            {this.renderEntry("Data entry row", routePage.dataEntryRow.go)}

            <div className={styleTitle}>Components</div>
            {this.renderEntry("Inputs", routePage.inputs.go)}
            {this.renderEntry("Inputs Inline", routePage.inputsInline.go)}
            {this.renderEntry("Trees", routePage.trees.go)}
            {this.renderEntry("Progress", routePage.progress.go)}
            {this.renderEntry("Range picker", routePage.range.go)}
            {this.renderEntry("Buttons", routePage.buttons.go)}
            {this.renderEntry("Placeholders", routePage.placeholders.go)}
            {this.renderEntry("Alert messages", routePage.alertMessages.go)}
            {this.renderEntry("Transfer material card", routePage.transferMaterialCard.go)}

            <div className={styleTitle}>Tables</div>

            {this.renderEntry("Sampling Counter", routePage.samplingCounter.go)}

            <div className={styleTitle}>Misc</div>

            {this.renderEntry("Uploader", routePage.uploader.go)}
            {this.renderEntry("QR Code", routePage.qrcode.go)}
            {this.renderEntry("SIP examples", routePage.SIPExamples.go)}
          </div>
        </div>
      );
    } else {
      switch (router.name) {
        case Nav.WhiteboardInputs:
          return <DemoInput />;
        case Nav.WhiteboardTrees:
          return <DemoTrees />;
        case Nav.WhiteboardInputsInline:
          return <WhiteboardDemoInputsInline />;
        case Nav.WhiteboardRange:
          return <DemoRangePicker />;
        case Nav.WhiteboardQrCode:
          return <DemoQrCode />;
        case Nav.WhiteboardProgress:
          return <DemoProgress />;
        case Nav.WhiteboardSamplingCounter:
          return <DemoSamplingCounter />;
        case Nav.DemoTabsBar:
          return <DemoTabsBar />;
        case Nav.DemoDataEntryRow:
          return <DemoDataEntryRow />;
        case Nav.DemoButtons:
          return <DemoButtons />;
        case Nav.DemoPlaceholder:
          return <DemoPlaceholder />;
        case Nav.DemoAlertMessages:
          return <DemoAlertMessages />;
        default:
          return <div>{`Invalid router name: ${router.name}`}</div>;
      }
    }
  }

  renderEntry(name: string, behavior: () => void) {
    return (
      <div className={cx(styleEntry)} onClick={behavior}>
        {name}
      </div>
    );
  }
}

const styleEntry = css`
  padding: 0 8px;
  line-height: 48px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;

  &:hover,
  &:active {
    background-color: hsl(0, 0%, 90%);
  }
`;

const styleContainer = css`
  padding: 16px;
  flex-wrap: wrap;
  overflow: auto;
  padding-bottom: 200px;
`;

const styleToolbar = css`
  padding: 16px;
`;

const styleTitle = css`
  margin-top: 40px;
  font-weight: bold;
`;
