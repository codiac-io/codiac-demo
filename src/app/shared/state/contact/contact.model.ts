import { ID } from '@datorama/akita';

export interface Contact {
  id: ID;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
}

export function createContact(params: Partial<Contact>) {
  return {
    ...params
  } as Contact;
}
