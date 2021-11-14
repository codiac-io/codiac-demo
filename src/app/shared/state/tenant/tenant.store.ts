import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Tenant } from './tenant.model';
import { Injectable } from '@angular/core';

export interface TenantState extends EntityState<Tenant> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tenant' })
export class TenantStore extends EntityStore<TenantState, Tenant> {

  constructor() {
    super();
  }

}

export const tenantStore = new TenantStore();

