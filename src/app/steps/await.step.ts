import { PageAwaiterOptions, Result } from '@/core';
import { autobind } from 'core-decorators';
import { BaseStep } from './base';

@autobind
export class PageAwaiter extends BaseStep {
  constructor(private _options: PageAwaiterOptions) {
    super();
  }

  public async execute(result: Result): Promise<void> {
    const { waitTime } = this._options;
    console.debug(`Waiting for ${waitTime / 1000} seconds.`);

    await new Promise(resolve => setTimeout(() => resolve(), waitTime)).catch(({ message }: Error) => {
      result.warnings.push(message);
      console.debug(message);
    });

    console.debug('Page is ready to proceed.');
  }
}
