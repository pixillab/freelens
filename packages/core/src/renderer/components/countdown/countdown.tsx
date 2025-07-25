/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { observer } from "mobx-react";
import React from "react";

import type { IComputedValue } from "mobx";
import type { HTMLAttributes } from "react";

interface CountdownProps extends HTMLAttributes<HTMLSpanElement> {
  secondsTill: IComputedValue<number>;
}

export const Countdown = observer(({ secondsTill, ...props }: CountdownProps) => (
  <span {...props}>{secondsTill.get()}</span>
));
