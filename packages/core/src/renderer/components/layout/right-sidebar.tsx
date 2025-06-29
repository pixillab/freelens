/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { cssNames } from "@freelensapp/utilities";
import { observer } from "mobx-react";
import React from "react";
import styles from "./right-sidebar.module.scss";

const RightSidebar = observer(() => (
  <div className={cssNames("flex flex-col")} data-testid="right-sidebar" style={{ backgroundColor: '#ff0000', minWidth: '200px', width: '200px' }}>
    <div className={styles.rightSidebarContent} style={{ backgroundColor: '#ff0000', minWidth: '200px', width: '200px' }}>
      <div style={{ padding: '16px', color: '#fff', fontSize: '14px', backgroundColor: '#ff0000' }}>
        RIGHT SIDEBAR TEST
      </div>
      {/* Empty for now - can be populated with components later */}
    </div>
  </div>
));

export { RightSidebar }; 