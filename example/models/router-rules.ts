import { IRouteRule } from "@jimengio/ruled-router";

export enum Nav {
  IncomingInspection = "incoming-inspection",
  InProcessInspection = "in-process-inspection",
  OutgoingInspection = "outgoing-inspection",
  DeviceMaintenance = "device-maintenance",
  Packing = "packing",
  WarehouseIn = "warehouse-in",
  WarehouseOut = "warehouse-out",

  // Operations
  Create = "create",
  Edit = "edit",

  // Tabs
  Plans = "plans",
  Devices = "devices",
  PlanDetail = "plan-detail",
  DeviceDetail = "device-detail",

  TabDetail = "detail",
  TabHistory = "history",

  // global
  Home = "home",

  // whiteboard
  Whiteboard = "whiteboard",
  WhiteboardUploader = "uploader",
  WhiteboardInputs = "inputs",
  WhiteboardInputsInline = "inputs-inline",
  WhiteboardRange = "range",
  WhiteboardQrCode = "qrcode",
  WhiteboardProgress = "progress",
  WhiteboardSamplingCounter = "sampling-counter",
  WhiteboardTrees = "trees",
  DemoTabsBar = "tabs-bar",
  DemoDataEntryRow = "data-entry-row",
  DemoButtons = "buttons",
  DemoPlaceholder = "placeholders",
  DemoAlertMessages = "alert-messages",
  DemoTransferMaterialCard = "transfer-material-card",

  IncomingSamplingTable = "incoming-sampling-table",
  InProcessSamplingTable = "in-process-sampling-table",
  OutgoingSamplingTable = "outgoing-sampling-table",
  SipExamples = "SIP-examples",
  PlanDetailTable = "plan-detail-table",
}

export const routerRules: IRouteRule[] = [
  { path: Nav.Home },
  { path: Nav.IncomingInspection, next: [{ path: Nav.Create }, { path: Nav.Edit }] },
  { path: Nav.InProcessInspection, next: [{ path: Nav.Create }, { path: Nav.Edit }] },
  { path: Nav.OutgoingInspection, next: [{ path: Nav.Create }, { path: Nav.Edit }] },
  { path: Nav.Packing, next: [{ path: Nav.Create }, { path: Nav.Edit }] },
  {
    path: Nav.DeviceMaintenance,
    next: [
      { path: Nav.Plans },
      { path: Nav.Devices },
      {
        path: `${Nav.DeviceDetail}/:deviceId`,
        name: Nav.DeviceDetail,
        next: [{ path: Nav.TabDetail }, { path: Nav.TabHistory }, { path: "", name: Nav.TabDetail }],
      },
      {
        path: `${Nav.PlanDetail}/:deviceId/:planId/:date`, // currently use date format 2000-01-01
        name: Nav.PlanDetail,
      },
      { path: "", name: Nav.Home },
    ],
  },
  { path: Nav.WarehouseIn },
  { path: Nav.WarehouseOut },
  {
    path: Nav.Whiteboard,
    next: [
      { path: Nav.WhiteboardUploader },
      { path: Nav.WhiteboardInputs },
      { path: Nav.WhiteboardTrees },
      { path: Nav.WhiteboardInputsInline },
      { path: Nav.WhiteboardRange },
      { path: Nav.WhiteboardQrCode },
      { path: Nav.WhiteboardProgress },
      { path: Nav.WhiteboardSamplingCounter },
      { path: Nav.IncomingSamplingTable },
      { path: Nav.InProcessSamplingTable },
      { path: Nav.OutgoingSamplingTable },
      { path: Nav.SipExamples },
      { path: Nav.DemoTabsBar },
      { path: Nav.PlanDetailTable },
      { path: Nav.DemoDataEntryRow },
      { path: Nav.DemoButtons },
      { path: Nav.DemoPlaceholder },
      { path: Nav.DemoAlertMessages },
      { path: Nav.DemoTransferMaterialCard },
    ],
  },
  { path: "", name: Nav.Home },
];

(window as any).devGlobalRoutes = routerRules;
