import * as dom from "@codiac.io/codiac-domain"
import { Cabinet } from "../cabinet";

export interface Environment extends dom.Environment {
}

export function createEnvironment(params: Partial<Environment>) {
  return {
    ...params
  } as Environment;
}
