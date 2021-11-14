import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Contact } from './contact.model';
import { Injectable } from '@angular/core';

export interface ContactState extends EntityState<Contact> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'contact' })
export class ContactStore extends EntityStore<ContactState, Contact> {
  constructor() {
    super();
  }
}

export const contactStore = new ContactStore();
