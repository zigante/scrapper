import { ScrapperConfigs, RecordSet } from '@/core';

const { PLATAFORM, RESULT_PATH } = process.env as RecordSet<string>;

export const loadScrapperConfigs = (): ScrapperConfigs => ({
  plataform: PLATAFORM,
  resultPath: RESULT_PATH || '/tmp',
});
