/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import "./pod-details-tolerations.scss";

import React from "react";
import { DrawerItem, DrawerParamToggler } from "../drawer";
import { PodTolerations } from "./pod-tolerations";

import type { KubeObject, Toleration } from "@freelensapp/kube-object";

export interface KubeObjectWithTolerations extends KubeObject {
  getTolerations(): Toleration[];
}

export interface PodDetailsTolerationsProps {
  workload: KubeObjectWithTolerations;
}

export function PodDetailsTolerations({ workload }: PodDetailsTolerationsProps) {
  const tolerations = workload.getTolerations();

  if (!tolerations.length) return null;

  return (
    <DrawerItem name="Tolerations" className="PodDetailsTolerations">
      <DrawerParamToggler label={tolerations.length}>
        <PodTolerations tolerations={tolerations} />
      </DrawerParamToggler>
    </DrawerItem>
  );
}
