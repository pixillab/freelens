/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { ErrorBoundary } from "@freelensapp/error-boundary";
import { ResizeDirection, ResizeGrowthDirection, ResizeSide, ResizingAnchor } from "@freelensapp/resizing-anchor";
import { cssNames } from "@freelensapp/utilities";
import { withInjectables } from "@ogre-tools/injectable-react";
import { observer } from "mobx-react";
import React from "react";
import styles from "./main-layout.module.scss";
import sidebarStorageInjectable, { defaultSidebarWidth } from "./sidebar-storage/sidebar-storage.injectable";

import type { StrictReactNode } from "@freelensapp/utilities";

import type { StorageLayer } from "../../utils/storage-helper";
import type { SidebarStorageState } from "./sidebar-storage/sidebar-storage.injectable";

export interface MainLayoutProps {
  sidebar: StrictReactNode;
  className?: string;
  footer?: StrictReactNode;
  children?: StrictReactNode;
  rightSidebar?: StrictReactNode;
}

/**
 * Main layout is commonly used as a wrapper for "global pages"
 *
 * @link https://api-docs.k8slens.dev/master/extensions/capabilities/common-capabilities/#global-pages
 */

interface Dependencies {
  sidebarStorage: StorageLayer<SidebarStorageState>;
}

@observer
class NonInjectedMainLayout extends React.Component<MainLayoutProps & Dependencies> {
  onSidebarResize = (width: number) => {
    this.props.sidebarStorage.merge({ width });
  };

  render() {
    const { className, footer, children, sidebar, rightSidebar } = this.props;
    const { width: sidebarWidth } = this.props.sidebarStorage.get();
    const rightSidebarWidth = 200;
    const style = { 
      "--sidebar-width": `${sidebarWidth}px`,
      "--right-sidebar-width": `${rightSidebarWidth}px`
    } as React.CSSProperties;

    return (
      <div className={cssNames(styles.mainLayout, className)} style={style}>
        <div className={styles.sidebar}>
          {sidebar}
          <ResizingAnchor
            direction={ResizeDirection.HORIZONTAL}
            placement={ResizeSide.TRAILING}
            growthDirection={ResizeGrowthDirection.LEFT_TO_RIGHT}
            getCurrentExtent={() => sidebarWidth}
            onDrag={this.onSidebarResize}
            onDoubleClick={() => this.onSidebarResize(defaultSidebarWidth)}
            minExtent={150}
            maxExtent={400}
          />
        </div>

        <div className={styles.contents}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>

        <div className={styles.rightSidebar}>
          <div className={styles.rightSidebarContent}>
            {rightSidebar || (
              <div className={styles.rightSidebarPlaceholder}>
                <div className={styles.rightSidebarTitle}>Right Panel</div>
                <div className={styles.rightSidebarDescription}>
                  This panel is ready for additional content such as cluster information, resource details, or quick actions.
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.footer}>{footer}</div>
      </div>
    );
  }
}

export const MainLayout = withInjectables<Dependencies, MainLayoutProps>(NonInjectedMainLayout, {
  getProps: (di, props) => ({
    ...props,
    sidebarStorage: di.inject(sidebarStorageInjectable),
  }),
});
