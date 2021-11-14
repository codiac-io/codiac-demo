import * as dom from "@codiac.io/codiac-domain"

export interface Asset extends dom.Asset {
}

export function createAsset(params: Partial<Asset>) {
  return {
    ...params
  } as Asset;
}
