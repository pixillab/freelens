/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import "./preferences.scss";

import { withInjectables } from "@ogre-tools/injectable-react";
import { observer } from "mobx-react";
import React from "react";
import { checkThatAllDiscriminablesAreExhausted } from "../../../common/utils/composable-responsibilities/discriminable/discriminable";
import { Gutter } from "../../../renderer/components/gutter";
import { SettingLayout } from "../../../renderer/components/layout/setting-layout";
import { Map } from "../../../renderer/components/map";
import closePreferencesInjectable from "./close-preferences/close-preferences.injectable";
import currentPreferenceTabCompositeInjectable from "./preference-items/current-preference-tab-composite.injectable";
import { PreferencesNavigation } from "./preference-navigation/preferences-navigation";

import type { IComputedValue } from "mobx";

import type { Composite } from "../../../common/utils/composite/get-composite/get-composite";
import type { PreferenceItemTypes, PreferenceTab } from "./preference-items/preference-item-injection-token";

interface Dependencies {
  closePreferences: () => void;
  pageComposite: IComputedValue<Composite<PreferenceTab> | undefined>;
}

const NonInjectedPreferences = observer(({ closePreferences, pageComposite }: Dependencies) => {
  const composite = pageComposite.get();

  return (
    <SettingLayout
      navigation={<PreferencesNavigation />}
      className="Preferences"
      contentGaps={false}
      closeButtonProps={{ "data-testid": "close-preferences" }}
      back={closePreferences}
    >
      {composite ? (
        toPreferenceItemHierarchy(composite)
      ) : (
        <div className="flex items-center" data-preference-page-does-not-exist-test={true}>
          No preferences found
        </div>
      )}
    </SettingLayout>
  );
});

const toPreferenceItemHierarchy = (composite: Composite<PreferenceItemTypes>) => {
  const value = composite.value;

  switch (value.kind) {
    case "block": {
      const Component = value.Component;

      return (
        <div data-preference-item-test={composite.id}>
          <Component item={value}>
            <Map items={composite.children} getSeparator={value.childSeparator}>
              {toPreferenceItemHierarchy}
            </Map>
          </Component>
        </div>
      );
    }

    case "page": {
      const Component = value.Component;

      return (
        <Component item={value}>
          <Map items={composite.children} getSeparator={value.childSeparator || defaultSeparator}>
            {toPreferenceItemHierarchy}
          </Map>
        </Component>
      );
    }

    case "tab-group":

    case "tab": {
      return <Map items={composite.children}>{toPreferenceItemHierarchy}</Map>;
    }

    default: {
      throw checkThatAllDiscriminablesAreExhausted(value);
    }
  }
};

export const Preferences = withInjectables<Dependencies>(
  NonInjectedPreferences,

  {
    getProps: (di, props) => ({
      closePreferences: di.inject(closePreferencesInjectable),
      pageComposite: di.inject(currentPreferenceTabCompositeInjectable),
      ...props,
    }),
  },
);

const defaultSeparator = () => <Gutter size="xl" />;
