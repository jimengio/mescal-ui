// Self-made form layout utilities

// To learn more https://github.com/beego/dev/issues/723#issuecomment-377137166

import _ from "lodash";

export interface ISingleValidationResult {
  failed: boolean;
  reason?: string;
}

export interface IValidationInfomation {
  [field: string]: string;
}

export interface IValidationResult {
  passed?: boolean;
  information?: IValidationInfomation;
}

type IValidationRule = (data: any) => ISingleValidationResult;

interface IValidationFieldItems {
  field: string;
  rules: IValidationRule[];
}

export type IValidationFields = IValidationFieldItems[];

export const validationMethods = {
  required: (data): ISingleValidationResult => {
    const defaultFailed = { failed: true, reason: "lang.httpRequired" };

    if (data == null) {
      return defaultFailed;
    } else if (_.isString(data)) {
      if (data.length === 0) {
        return defaultFailed;
      }
    } else if (Array.isArray(data)) {
      if (!data.length) {
        return defaultFailed;
      }
    }

    return { failed: false };
  },
  max: (n) => (data): ISingleValidationResult => {
    if (_.isNumber(data)) {
      if (data <= n) {
        return { failed: false };
      } else {
        return { failed: true, reason: `Failed: ${data} <= ${n}` };
      }
    }
    return { failed: true, reason: `${data} is not a number` };
  },
  // not tested yet
  min: (n) => (data): ISingleValidationResult => {
    if (_.isNumber(data)) {
      if (data >= n) {
        return { failed: false };
      } else {
        return { failed: true, reason: `Failed: ${data} >= ${n}` };
      }
    }
    return { failed: true, reason: `${data} is not a number` };
  },
};

export function performValidation(data: any, fieldsWithRule: IValidationFields): IValidationResult {
  // will be modified by the loop
  const result: IValidationResult = {
    passed: true,
    information: {},
  };
  // loop over all fields, collect results and mutata result
  fieldsWithRule.forEach((item) => {
    for (let i in item.rules) {
      const rule = item.rules[i];

      let fieldValue = data;
      item.field.split(".").forEach((key) => {
        fieldValue = fieldValue[key];
      });

      const singleResult: ISingleValidationResult = rule(fieldValue);

      if (singleResult.failed) {
        result.passed = false;
        result.information[item.field] = singleResult.reason;
        break;
      }
    }
  });

  return result;
}

// new validation rules

// to generate errors
export type IShapedFailures<T> = { [P in keyof T]?: string };
export type IShapedRules<T> = { [P in keyof T]?: (form: T) => string };

export function getValidationFailures<T>(rules: IShapedRules<T>, form: T): IShapedFailures<T> {
  let failures: IShapedFailures<T> = {};
  _.keys(rules).forEach((field) => {
    failures[field] = rules[field](form);
  });
  return failures;
}

// function outdated, see https://github.com/beego/fi/pull/1247
export function isFailuresEmpty(failures: object): boolean {
  return _.values(failures).every(_.isNil);
}

export function formatFailures(failures: { [k: string]: string }): string {
  return _.map(failures, (v, k) => {
    return `${k}: ${v}`;
  }).join("\n");
}
