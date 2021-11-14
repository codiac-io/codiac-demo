import * as dom from "@codiac.io/codiac-domain";

export interface User extends dom.User {
  userName: string;
  newUser: boolean;
  profiles: any[];
  roles: any[];
  tenantCode: string;
  tenantName: string;
}

export function createUser(params: Partial<User>) {
  return {
    ...params
  } as User;
}
