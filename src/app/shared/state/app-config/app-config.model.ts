
export interface AppConfig {
    isStaticConfig: boolean,
    api: string,
    auth: string,
    version: string,
}

export function createAppConfig(params: Partial<AppConfig>) {
    return {
        ...params
    } as AppConfig;
}
