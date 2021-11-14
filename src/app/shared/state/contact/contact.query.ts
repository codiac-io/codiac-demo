import { QueryEntity } from '@datorama/akita';
import { ContactStore, ContactState, contactStore } from './contact.store';
import { Contact } from './contact.model';

export class ContactQuery extends QueryEntity<ContactState, Contact> {

  constructor(protected store: ContactStore) {
    super(store);
  }

}

export const contactQuery = new ContactQuery(contactStore);
