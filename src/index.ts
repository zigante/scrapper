export { Page } from './app';
export { JobStep, PageConfigs as ScrapperOptions, Result as ScrapperResult } from './core';
import { version, name } from '~/package.json';

console.info(`Starting module ${name}@${version}`);
