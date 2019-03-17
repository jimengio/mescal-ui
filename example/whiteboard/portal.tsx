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
import DemoInputRadio from "./demo-inputs-radio";
import DemoTrees from "./demo-trees";
import { DemoSwitchOkNg } from "./demo-switch-ok-ng";
import DemoNavigatorPage from "./demo-navigator-page";
import { DemoNavigatorSelect } from "./demo-navigator-select";
import DemoNavHeader from "./demo-nav-header";

interface IProps {
  router: IRouteParseResult;
}

interface IState {}

export default class WhiteboardPortal extends React.Component<IProps, IState> {
  render() {
    let { router } = this.props;

    let routePage = genRouter;

    if (router.name === Nav.Home) {
      return (
        <div className={cx(fullscreen, column)}>
          <div className={cx(flex, styleContainer)}>
            <div className={styleTitle}>Pinned</div>
            {this.renderEntry("Tabs bar", routePage.tabsBar.go)}
            {this.renderEntry("Data entry row", routePage.dataEntryRow.go)}

            <div className={styleTitle}>Components</div>
            {this.renderEntry("Inputs", routePage.inputs.go)}
            {this.renderEntry("Inputs Inline", routePage.inputsInline.go)}
            {this.renderEntry("Inputs radio", routePage.inputsRadio.go)}
            {this.renderEntry("Trees", routePage.trees.go)}
            {this.renderEntry("Progress", routePage.progress.go)}
            {this.renderEntry("Range picker", routePage.range.go)}
            {this.renderEntry("Buttons", routePage.buttons.go)}
            {this.renderEntry("Placeholders", routePage.placeholders.go)}
            {this.renderEntry("Alert messages", routePage.alertMessages.go)}
            {this.renderEntry("Switch Ok Ng", routePage.switchOkNg.go)}
            {this.renderEntry("Navigator Page", routePage.navigatorPage.go)}
            {this.renderEntry("Navigator Select", routePage.navigatorSelect.go)}
            {this.renderEntry("Nav Header", routePage.navHeader.go)}

            <div className={styleTitle}>Tables</div>

            {this.renderEntry("Sampling Counter", routePage.samplingCounter.go)}

            <div className={styleTitle}>Misc</div>

            {this.renderEntry("QR Code", routePage.qrcode.go)}
          </div>
        </div>
      );
    } else {
      switch (router.name) {
        case Nav.DemoInputs:
          return <DemoInput />;
        case Nav.DemoTrees:
          return <DemoTrees />;
        case Nav.DemoInputsInline:
          return <WhiteboardDemoInputsInline />;
        case Nav.DemoInputsRadio:
          return <DemoInputRadio />;
        case Nav.DemoRange:
          return <DemoRangePicker />;
        case Nav.DemoQrCode:
          return <DemoQrCode />;
        case Nav.DemoProgress:
          return <DemoProgress />;
        case Nav.DemoSamplingCounter:
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
        case Nav.DemoSwitchOkNg:
          return <DemoSwitchOkNg />;
        case Nav.DemoNavigatorPage:
          return <DemoNavigatorPage />;
        case Nav.DemoNavigatorSelect:
          return <DemoNavigatorSelect />;
        case Nav.DemoNavHeader:
          return <DemoNavHeader />;
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

const styleTitle = css`
  margin-top: 40px;
  font-weight: bold;
`;
