import { Configs, ConfigType } from '@/core';
import { autobind } from 'core-decorators';
import { config as dotenvConfig } from 'dotenv';
import * as CONFIGS from './providers';

dotenvConfig();

@autobind
export class Config {
  private static _configs: Map<Configs, ConfigType>;

  private constructor() {
    Config._configs = new Map();
    this.loadConfigs();
  }

  public static get<T>(configName: Configs): T {
    this._configs || new Config();

    return (this._configs.get(configName) as unknown) as T;
  }

  private loadConfigs(): Config {
    Config._configs.set('PROCESS', CONFIGS.loadProcessConfigs());
    Config._configs.set('SCRAPPER', CONFIGS.loadScrapperConfigs());

    return this;
  }
}
