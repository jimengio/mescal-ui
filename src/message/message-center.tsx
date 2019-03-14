import { IAlertMessage, EAlertMessageKind } from "../models/alert-message";
import shortid from "shortid";
import { createStore } from "@jimengio/rex";
import { Id } from "../models/types";

export interface IGlobalStore {
  alertMessages: IAlertMessage[];
}

// immer data
let initialStore: IGlobalStore = {
  alertMessages: [],
};

export let alertMessagesStore = createStore<IGlobalStore>(initialStore);

// controllers

export function showAlertMessage(message: IAlertMessage) {
  let messageId = shortid.generate();
  message.id = messageId;

  alertMessagesStore.update((store) => {
    if (store.alertMessages[0] != null) {
      let m0 = store.alertMessages[0];
      // remove old message if there a new message that is same
      if (m0.kind === message.kind && m0.text === message.text) {
        store.alertMessages.splice(0, 1);
      }
    }
    store.alertMessages.unshift(message);
  });

  let duration = message.duration || 2;

  setTimeout(() => {
    alertMessagesStore.update((store) => {
      store.alertMessages = store.alertMessages.filter((m) => {
        return m.id !== messageId;
      });
    });
  }, duration * 1000);
}

export function showWarningAlertMessage(text: string) {
  let message = {
    text,
    kind: EAlertMessageKind.Warning,
  };
  showAlertMessage(message);
}

export function showSuccessAlertMessage(text: string) {
  let message = {
    text,
    kind: EAlertMessageKind.Success,
  };
  showAlertMessage(message);
}

export function showInfoAlertMessage(text: string) {
  let message = {
    text,
    kind: EAlertMessageKind.Info,
  };
  showAlertMessage(message);
}

export function showErrorAlertMessage(text: string) {
  let message = {
    text,
    kind: EAlertMessageKind.Error,
  };
  showAlertMessage(message);
}

export function removeAlertMessage(messageId: Id) {
  alertMessagesStore.update((store) => {
    store.alertMessages = store.alertMessages.filter((m) => {
      return m.id !== messageId;
    });
  });
}
