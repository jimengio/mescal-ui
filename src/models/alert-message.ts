import { Id } from "./types";

export enum EAlertMessageKind {
  Info,
  Success,
  Warning,
  Error,
}

export interface IAlertMessage {
  id?: Id;
  text: string;
  duration?: number;
  kind?: EAlertMessageKind;
}
