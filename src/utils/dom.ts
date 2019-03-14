export function scrollToElement(x: HTMLElement) {
  let f = (x as any).scrollIntoViewIfNeeded.bind(x);
  if (typeof f === "function") {
    f();
  } else {
    x.scrollIntoView();
  }
}
