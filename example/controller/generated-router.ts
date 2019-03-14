export function switchPath(x: string) {
  location.hash = `#${x}`;
}

export function routeBack() {
  history.back();
}

// --- code below is generated with http://fe.jimu.io/nav-code-generator/

export let genRouter = {
  inputs: {
    name: "inputs",
    raw: "inputs",
    path: () => `/inputs`,
    go: () => switchPath(`/inputs`),
  },
  trees: {
    name: "trees",
    raw: "trees",
    path: () => `/trees`,
    go: () => switchPath(`/trees`),
  },
  inputsInline: {
    name: "inputs-inline",
    raw: "inputs-inline",
    path: () => `/inputs-inline`,
    go: () => switchPath(`/inputs-inline`),
  },
  range: {
    name: "range",
    raw: "range",
    path: () => `/range`,
    go: () => switchPath(`/range`),
  },
  qrcode: {
    name: "qrcode",
    raw: "qrcode",
    path: () => `/qrcode`,
    go: () => switchPath(`/qrcode`),
  },
  progress: {
    name: "progress",
    raw: "progress",
    path: () => `/progress`,
    go: () => switchPath(`/progress`),
  },
  samplingCounter: {
    name: "sampling-counter",
    raw: "sampling-counter",
    path: () => `/sampling-counter`,
    go: () => switchPath(`/sampling-counter`),
  },
  dataEntryRow: {
    name: "data-entry-row",
    raw: "data-entry-row",
    path: () => `/data-entry-row`,
    go: () => switchPath(`/data-entry-row`),
  },
  buttons: {
    name: "buttons",
    raw: "buttons",
    path: () => `/buttons`,
    go: () => switchPath(`/buttons`),
  },
  placeholders: {
    name: "placeholders",
    raw: "placeholders",
    path: () => `/placeholders`,
    go: () => switchPath(`/placeholders`),
  },
  alertMessages: {
    name: "alert-messages",
    raw: "alert-messages",
    path: () => `/alert-messages`,
    go: () => switchPath(`/alert-messages`),
  },
  transferMaterialCard: {
    name: "transfer-material-card",
    raw: "transfer-material-card",
    path: () => `/transfer-material-card`,
    go: () => switchPath(`/transfer-material-card`),
  },
  tabsBar: {
    name: "tabs-bar",
    raw: "tabs-bar",
    path: () => `/tabs-bar`,
    go: () => switchPath(`/tabs-bar`),
  },
  _: {
    name: "home",
    raw: "",
    path: () => `/`,
    go: () => switchPath(`/`),
  },
};
