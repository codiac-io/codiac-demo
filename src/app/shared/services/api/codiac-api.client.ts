
import { CodiacClient } from '@codiac.io/codiac-api-client';
import { BetterConsoleLogger } from '@codiac.io/codiac-common/better-logger';
import { AppConfigQuery } from '../../state/app-config';
import { AuthTokenQuery } from '../../state/auth-token';
export class CodiacApiClient {
  public _codiacApi: CodiacClient;
  constructor(private appConfigQuery: AppConfigQuery, private authTokenQuery: AuthTokenQuery) {
    // CodiacClient.bootstrap();
    // this.authTokenQuery.select().subscribe(tokenStore =>{
    //     this._codiacApi = CodiacClient.create(new BetterConsoleLogger(), appConfigQuery.getValue().api, tokenStore.token);
    //     console.log("codiac api new'ed up")
    // });
  }
}
