import * as dom from "@codiac.io/codiac-domain";
export interface CurrentSubscription extends dom.Subscription {
}

export function createCurrentSubscription(params: Partial<CurrentSubscription>) {
  return {
    ...params
  } as CurrentSubscription;
}
