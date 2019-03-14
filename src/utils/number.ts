import { format } from "url";

export function formatFloatFixed(x: number) {
  if (x == null) {
    return null;
  } else if (Number.isInteger(x)) {
    return x.toFixed();
  } else {
    return x.toFixed(3);
  }
}

export function numberOrEmpty(x: string): number {
  if (x.match(/^-?([\d]*.[\d]*)|\d+$/)) {
    return parseFloat(x);
  } else {
    return null;
  }
}
