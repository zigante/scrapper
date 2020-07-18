export type ProcessConfigs = {
  nodeEnv: string;
  serviceName: string;
};

export type ScrapperConfigs = {
  plataform: string;
  resultPath: string;
};

export type Configs = 'PROCESS' | 'SCRAPPER';

export type ConfigType = ProcessConfigs | ScrapperConfigs;
