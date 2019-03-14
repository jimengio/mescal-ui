type Id = string;

export function switchPath(x: string) {
  location.hash = `#${x}`;
}

export function routeBack() {
  history.back();
}

// --- code below is generated with http://fe.jimu.io/nav-code-generator/

export let genRouter = {
  home: {
    name: "",
    raw: "home",
    path: () => `/home`,
    go: () => switchPath(`/home`),
  },
  incomingInspection: {
    name: "",
    raw: "incoming-inspection",
    path: () => `/incoming-inspection`,
    go: () => switchPath(`/incoming-inspection`),
    create: {
      name: "",
      raw: "create",
      path: () => `/incoming-inspection/create`,
      go: () => switchPath(`/incoming-inspection/create`),
    },
    edit: {
      name: "",
      raw: "edit",
      path: () => `/incoming-inspection/edit`,
      go: () => switchPath(`/incoming-inspection/edit`),
    },
  },
  inProcessInspection: {
    name: "",
    raw: "in-process-inspection",
    path: () => `/in-process-inspection`,
    go: () => switchPath(`/in-process-inspection`),
    create: {
      name: "",
      raw: "create",
      path: () => `/in-process-inspection/create`,
      go: () => switchPath(`/in-process-inspection/create`),
    },
    edit: {
      name: "",
      raw: "edit",
      path: () => `/in-process-inspection/edit`,
      go: () => switchPath(`/in-process-inspection/edit`),
    },
  },
  outgoingInspection: {
    name: "",
    raw: "outgoing-inspection",
    path: () => `/outgoing-inspection`,
    go: () => switchPath(`/outgoing-inspection`),
    create: {
      name: "",
      raw: "create",
      path: () => `/outgoing-inspection/create`,
      go: () => switchPath(`/outgoing-inspection/create`),
    },
    edit: {
      name: "",
      raw: "edit",
      path: () => `/outgoing-inspection/edit`,
      go: () => switchPath(`/outgoing-inspection/edit`),
    },
  },
  packing: {
    name: "",
    raw: "packing",
    path: () => `/packing`,
    go: () => switchPath(`/packing`),
    create: {
      name: "",
      raw: "create",
      path: () => `/packing/create`,
      go: () => switchPath(`/packing/create`),
    },
    edit: {
      name: "",
      raw: "edit",
      path: () => `/packing/edit`,
      go: () => switchPath(`/packing/edit`),
    },
  },
  deviceMaintenance: {
    name: "",
    raw: "device-maintenance",
    path: () => `/device-maintenance`,
    go: () => switchPath(`/device-maintenance`),
    plans: {
      name: "",
      raw: "plans",
      path: () => `/device-maintenance/plans`,
      go: () => switchPath(`/device-maintenance/plans`),
    },
    devices: {
      name: "",
      raw: "devices",
      path: () => `/device-maintenance/devices`,
      go: () => switchPath(`/device-maintenance/devices`),
    },
    deviceDetail_: {
      name: "device-detail",
      raw: "device-detail/:deviceId",
      path: (deviceId: Id) => `/device-maintenance/device-detail/${deviceId}`,
      go: (deviceId: Id) => switchPath(`/device-maintenance/device-detail/${deviceId}`),
      detail: {
        name: "",
        raw: "detail",
        path: (deviceId: Id) => `/device-maintenance/device-detail/${deviceId}/detail`,
        go: (deviceId: Id) => switchPath(`/device-maintenance/device-detail/${deviceId}/detail`),
      },
      history: {
        name: "",
        raw: "history",
        path: (deviceId: Id) => `/device-maintenance/device-detail/${deviceId}/history`,
        go: (deviceId: Id) => switchPath(`/device-maintenance/device-detail/${deviceId}/history`),
      },
      _: {
        name: "detail",
        raw: "",
        path: (deviceId: Id) => `/device-maintenance/device-detail/${deviceId}/`,
        go: (deviceId: Id) => switchPath(`/device-maintenance/device-detail/${deviceId}/`),
      },
    },
    planDetail___: {
      name: "plan-detail",
      raw: "plan-detail/:deviceId/:planId/:date",
      path: (deviceId: Id, planId: Id, date: string) => `/device-maintenance/plan-detail/${deviceId}/${planId}/${date}`,
      go: (deviceId: Id, planId: Id, date: string) => switchPath(`/device-maintenance/plan-detail/${deviceId}/${planId}/${date}`),
    },
    _: {
      name: "home",
      raw: "",
      path: () => `/device-maintenance/`,
      go: () => switchPath(`/device-maintenance/`),
    },
  },
  warehouseIn: {
    name: "",
    raw: "warehouse-in",
    path: () => `/warehouse-in`,
    go: () => switchPath(`/warehouse-in`),
  },
  warehouseOut: {
    name: "",
    raw: "warehouse-out",
    path: () => `/warehouse-out`,
    go: () => switchPath(`/warehouse-out`),
  },
  whiteboard: {
    name: "",
    raw: "whiteboard",
    path: () => `/whiteboard`,
    go: () => switchPath(`/whiteboard`),
    uploader: {
      name: "",
      raw: "uploader",
      path: () => `/whiteboard/uploader`,
      go: () => switchPath(`/whiteboard/uploader`),
    },
    inputs: {
      name: "",
      raw: "inputs",
      path: () => `/whiteboard/inputs`,
      go: () => switchPath(`/whiteboard/inputs`),
    },
    trees: {
      name: "",
      raw: "trees",
      path: () => `/whiteboard/trees`,
      go: () => switchPath(`/whiteboard/trees`),
    },
    inputsInline: {
      name: "",
      raw: "inputs-inline",
      path: () => `/whiteboard/inputs-inline`,
      go: () => switchPath(`/whiteboard/inputs-inline`),
    },
    range: {
      name: "",
      raw: "range",
      path: () => `/whiteboard/range`,
      go: () => switchPath(`/whiteboard/range`),
    },
    qrcode: {
      name: "",
      raw: "qrcode",
      path: () => `/whiteboard/qrcode`,
      go: () => switchPath(`/whiteboard/qrcode`),
    },
    progress: {
      name: "",
      raw: "progress",
      path: () => `/whiteboard/progress`,
      go: () => switchPath(`/whiteboard/progress`),
    },
    samplingCounter: {
      name: "",
      raw: "sampling-counter",
      path: () => `/whiteboard/sampling-counter`,
      go: () => switchPath(`/whiteboard/sampling-counter`),
    },
    incomingSamplingTable: {
      name: "",
      raw: "incoming-sampling-table",
      path: () => `/whiteboard/incoming-sampling-table`,
      go: () => switchPath(`/whiteboard/incoming-sampling-table`),
    },
    inProcessSamplingTable: {
      name: "",
      raw: "in-process-sampling-table",
      path: () => `/whiteboard/in-process-sampling-table`,
      go: () => switchPath(`/whiteboard/in-process-sampling-table`),
    },
    outgoingSamplingTable: {
      name: "",
      raw: "outgoing-sampling-table",
      path: () => `/whiteboard/outgoing-sampling-table`,
      go: () => switchPath(`/whiteboard/outgoing-sampling-table`),
    },
    SIPExamples: {
      name: "",
      raw: "SIP-examples",
      path: () => `/whiteboard/SIP-examples`,
      go: () => switchPath(`/whiteboard/SIP-examples`),
    },
    tabsBar: {
      name: "",
      raw: "tabs-bar",
      path: () => `/whiteboard/tabs-bar`,
      go: () => switchPath(`/whiteboard/tabs-bar`),
    },
    planDetailTable: {
      name: "",
      raw: "plan-detail-table",
      path: () => `/whiteboard/plan-detail-table`,
      go: () => switchPath(`/whiteboard/plan-detail-table`),
    },
    dataEntryRow: {
      name: "",
      raw: "data-entry-row",
      path: () => `/whiteboard/data-entry-row`,
      go: () => switchPath(`/whiteboard/data-entry-row`),
    },
    buttons: {
      name: "",
      raw: "buttons",
      path: () => `/whiteboard/buttons`,
      go: () => switchPath(`/whiteboard/buttons`),
    },
    placeholders: {
      name: "",
      raw: "placeholders",
      path: () => `/whiteboard/placeholders`,
      go: () => switchPath(`/whiteboard/placeholders`),
    },
    alertMessages: {
      name: "",
      raw: "alert-messages",
      path: () => `/whiteboard/alert-messages`,
      go: () => switchPath(`/whiteboard/alert-messages`),
    },
    transferMaterialCard: {
      name: "",
      raw: "transfer-material-card",
      path: () => `/whiteboard/transfer-material-card`,
      go: () => switchPath(`/whiteboard/transfer-material-card`),
    },
  },
  _: {
    name: "home",
    raw: "",
    path: () => `/`,
    go: () => switchPath(`/`),
  },
};
