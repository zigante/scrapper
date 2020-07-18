export * from './configs';
export * from './steps';

export type AnyType = any; // eslint-disable-line @typescript-eslint/no-explicit-any
export type Null<T> = T | null | undefined;
export type NotNull<T> = T extends null ? never : T;
export type RecordSet<T> = Record<string, T>;
