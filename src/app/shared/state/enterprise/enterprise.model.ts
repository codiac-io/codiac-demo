import * as dom from "@codiac.io/codiac-domain"

export interface Enterprise extends dom.Enterprise {
}

export function createEnterprise(params: Partial<Enterprise>) {
  return {
    ...params
  } as Enterprise;
}
