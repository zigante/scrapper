import { PageAwaiterOptions } from '@/core';
import { autobind } from 'core-decorators';
import { BaseStep } from './base';

@autobind
export class PageAwaiter extends BaseStep {
  constructor(private _options: PageAwaiterOptions) {
    super();
  }

  public async execute(): Promise<void> {
    const { waitTime } = this._options;
    console.log('Awaiting');
    return new Promise(resolve => setTimeout(() => resolve(), waitTime));
  }
}
