export type PrimitiveType = string | number | boolean;

export const buildUrl = (...args: PrimitiveType[]) => args.join('/');
