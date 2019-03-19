export type Id = string;

export enum EJudgementResult {
  Ok = "OK",
  Ng = "NG",
  Accept = "ACCEPT",
}

export interface ISimpleObject {
  [k: string]: any;
}
