import { ID } from '@datorama/akita';
import { User } from '../user';
import * as dom from "@codiac.io/codiac-domain";
import { Subscription } from '@codiac.io/codiac-domain';

export interface Tenant extends dom.Tenant {
  Users: User[]; // ***HACK*** api needs to obay camelcase
  currentSubscription: Subscription
}

export function createTenant(params: Partial<Tenant>) {
  return {
    ...params
  } as Tenant;
}