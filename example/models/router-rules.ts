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
}

export const routerRules: IRouteRule[] = [
  { path: Nav.WhiteboardInputs },
  { path: Nav.WhiteboardTrees },
  { path: Nav.WhiteboardInputsInline },
  { path: Nav.WhiteboardRange },
  { path: Nav.WhiteboardQrCode },
  { path: Nav.WhiteboardProgress },
  { path: Nav.WhiteboardSamplingCounter },
  { path: Nav.DemoDataEntryRow },
  { path: Nav.DemoButtons },
  { path: Nav.DemoPlaceholder },
  { path: Nav.DemoAlertMessages },
  { path: Nav.DemoTransferMaterialCard },
  { path: Nav.DemoTabsBar },
  { path: "", name: Nav.Home },
];

(window as any).devGlobalRoutes = routerRules;
