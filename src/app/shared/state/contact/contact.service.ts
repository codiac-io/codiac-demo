import { ID } from '@datorama/akita';
import { ContactStore } from './contact.store';
import { Observable } from 'rxjs';
import { Success } from '../../services/responses';
import { ApiService } from '../../services/api/api.service';
import { Injectable } from '@angular/core';
import { Contact } from './contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {

  constructor(protected apiSvc: ApiService, private contactStore: ContactStore) {
  }

  add(body: Contact): Observable<Success<Contact>> {
		this.apiSvc.subnav = 'Contacts/new'
    return this.apiSvc.post<Contact>(this.apiSvc.buildUrl(), body, this.contactStore);
  }

  update(body: Contact): Observable<Success<Contact>> {
		this.apiSvc.subnav = `Contacts/${body.id}`
    return this.apiSvc.put<Contact>(this.apiSvc.buildUrl(), body, this.contactStore);
  }

  delete(body: Contact): Observable<Success<Contact>> {
		this.apiSvc.subnav = 'Contacts/' + body.id;
    return this.apiSvc.delete<Contact>(this.apiSvc.buildUrl(), this.contactStore, null);
  }


}

// export const contactService = new ContactService(contactStore);
