import { ProcessConfigs, RecordSet } from '@/core';

const { NODE_ENV, SERVICE_NAME } = process.env as RecordSet<string>;

export const loadProcessConfigs = (): ProcessConfigs => ({
  nodeEnv: NODE_ENV,
  serviceName: SERVICE_NAME,
});
