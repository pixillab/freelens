/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { EventEmitter } from "@freelensapp/event-emitter";
import { getInjectable } from "@ogre-tools/injectable";

import type { AppEvent } from "./event-bus";

const appEventBusInjectable = getInjectable({
  id: "app-event-bus",
  instantiate: () => new EventEmitter<[AppEvent]>(),
  decorable: false,
});

export default appEventBusInjectable;
