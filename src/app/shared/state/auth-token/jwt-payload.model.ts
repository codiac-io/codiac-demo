import { Role } from '../../enum/role';
import { Tenant } from '../tenant/tenant.model';
import { createUser } from '../user/user.model';
export interface JwtPayload {
  email: string,
  exp: Date,
  family_name: string
  given_name: string
  roles: Role
  sub: string
  subx_enabled: boolean
  subx_status: string
  tenant_code: string
  tenant_name: string
  user_id: string
}

export function createJwtPayload(params: Partial<JwtPayload>) {
  return {
    ...params
  } as JwtPayload;
}

// export function createTenantFromJwtPayload(params: Partial<JwtPayload>) {
//   return {
//     code: params.tenant_code,
//     subscriptions: [],
//     users: [createUser({firstName: params.given_name, lastName: params.family_name})],
//     Users: [],
//     currentSubscription: null,
//     createdBy: "",
//     created: new Date(),
//     modifiedBy: "",
//     modified: new Date()
//   } as Tenant;
// }
