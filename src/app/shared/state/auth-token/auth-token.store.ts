import { StoreConfig, EntityStore, EntityState } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { JwtPayload } from './jwt-payload.model';

export interface AuthTokenState extends EntityState<string> {
  token: string;
  portalToken?: string;
  jwtPayload: JwtPayload;
  fusebillJwt?: string;
}

export function createInitialState(): AuthTokenState {
  return {
    token: null,
    portalToken: null,
    jwtPayload: null,
    fusebillJwt: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth-token' })
export class AuthTokenStore extends EntityStore<AuthTokenState, string> {

  constructor() {
    super(createInitialState());
  }

}

export const authTokenStore = new AuthTokenStore();

