export type Id = string;

export type BoxId = string;
export type ProductId = string;

export interface IListItems<T> {
  total: number;
  limit: number;
  items: T[];
}

export interface IListItemsResult<T> {
  result: T[];
  offset: number;
  limit: number;
  total: number;
}

export enum ViewingKind {
  All = "all",
  Deleted = "deleted",
}

export enum EJudgementResult {
  Ok = "OK",
  Ng = "NG",
  Accept = "ACCEPT",
}

export interface FuncOnProgressRatioKey {
  (ratio: number, key: string): void;
}

export interface FuncOnFileFinish {
  (fileKey: string): void;
}

export enum EContentType {
  PDF = "application/pdf",
  JPG = "image/jpg",
  JPEG = "image/jpeg",
  PNG = "image/png",
}

export interface ISimpleObject {
  [k: string]: any;
}

export enum ECheckKind {
  ByAmount = "quantitative",
  ByQuality = "qualitative",
  Attachment = "attachment",
  Action = "action",
}

export class Pagination {
  offset: number;
  limit: number;
  total: number;

  constructor(data) {
    this.offset = data.offset || 0;
    this.limit = data.limit || 0;
    this.total = data.total || 0;
  }
}

export interface IPagination<T> {
  result?: T[];
  items?: T[];
  offset: number;
  limit: number;
  total: number;
}

export interface IPaginationOption {
  offset?: number;
  limit?: number;
  deleted?: boolean;
}
