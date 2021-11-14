import * as dom from "@codiac.io/codiac-domain"

export interface ScopedSetting extends dom.ScopedSetting {
}

export function createScopedSetting(params: Partial<ScopedSetting>) {
  return {
    ...params
  } as ScopedSetting;
}
