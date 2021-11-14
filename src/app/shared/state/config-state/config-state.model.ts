import * as dom from "@codiac.io/codiac-domain"
import { ID } from '@datorama/akita';

export interface ConfigState {
  cabinet: string,
  environment: string,
  enterprise: string,
  clusterName: string,
  timestamp: Date,
  versionConfig: dom.EnterpriseVersionConfig,
  runState: dom.EnterpriseRunState
}

export function createConfigState(params: Partial<ConfigState>) {
  return {

  } as ConfigState;
}
