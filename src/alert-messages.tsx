import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";
import { IAlertMessage, EAlertMessageKind } from "./models/alert-message";
import { removeAlertMessage, alertMessagesStore } from "./message/message-center";

interface IProps {}

interface IState {
  messages: IAlertMessage[];
}

export default class AlertMessages extends React.Component<IProps, IState> {
  subscription: { unsubscribe: () => void };

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  componentDidMount() {
    this.subscription = alertMessagesStore.subscribe((store) => {
      this.mergeState({ messages: store.alertMessages });
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    let { messages } = this.state;

    return <div className={styleContainer}>{messages.map(this.renderMessage)}</div>;
  }

  renderMessage = (message: IAlertMessage, idx: number) => {
    return (
      <div
        key={message.id}
        className={cx(styleMessage)}
        style={{ backgroundColor: this.getBgColor(message.kind, idx) }}
        onClick={() => {
          removeAlertMessage(message.id);
        }}
      >
        {message.text}
      </div>
    );
  };

  getBgColor = (kind: EAlertMessageKind, x: number): string => {
    switch (kind) {
      case EAlertMessageKind.Success:
        return `hsla(100, 77%, 44%, ${this.getOpacity(x)})`;
      case EAlertMessageKind.Info:
        return `hsla(0, 0%, 59%, ${this.getOpacity(x)})`;
      default:
        return `hsla(0, 100%, 63%, ${this.getOpacity(x)})`;
    }
  };

  getOpacity = (x: number): number => {
    switch (x) {
      case 0:
        return 0.7;
      case 1:
        return 0.5;
      default:
        return 0.3;
    }
  };
}

const styleMessage = css`
  min-height: 24px;
  line-height: 24px;
  background-color: hsla(0, 100%, 63%, 0.7);
  text-align: center;

  color: white;
  font-size: 12px;

  margin-bottom: 8px;
  padding: 4px 8px;
  white-space: pre-line;
`;

const styleContainer = css`
  position: fixed;
  top: 100px;
  left: 50%;
  width: 40%;
  max-width: 400px;
  transform: translateX(-50%);
`;
