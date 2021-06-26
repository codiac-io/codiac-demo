import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { AppConfig } from './app-config.model';



export function createInitialState(): AppConfig {
  /***
   * GETTING THE APP CONFIG FROM THE IMPORT MEANS WE'RE GETTING THE ONE PACKED (STATIC) WITHIN THE APP.
   * CODIAC CANNOT/WILL NOT MUTATE IT.  WE CAN CONSIDER IT OUR FALLBACK, THAT LOADS THE VALUES WE BUILT WITH.
   *
   * CONFIG SVC WILL ASYNC GET THE ONE FROM THE SERVER VIA HTTP AND LOAD IT IN-PLACE OF THIS STATIC ONE.
   * THAT WILL BE THE CODIAC CONFIG'ED MOUNTED VALUES
   */
  try {
    const init = ({
      isStaticConfig: true,
    } as unknown as AppConfig);
    return init;
  }
  catch (error) {
    console.log("FAILED LOADING APP CONFIG");
  }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'AppConfig' })
export class AppConfigStore extends Store<AppConfig> {

  constructor() {
    super(createInitialState());
    // not sure why i have to call this twice. thought initial state (super) would set vals, go figure.
    this.update(createInitialState);
  }
}

export const environmentVariablesStore = new AppConfigStore();

