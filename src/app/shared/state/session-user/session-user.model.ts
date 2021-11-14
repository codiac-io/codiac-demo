import { ID } from '@datorama/akita';
import * as dom from "@codiac.io/codiac-domain";

export interface SessionUser extends dom.User {
  tenantCode: string;
}

export function createSessionUser(params: Partial<SessionUser>) {
  return {

  } as SessionUser;
}
