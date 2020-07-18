import { OptionSelectorOptions } from '@/core';
import { autobind } from 'core-decorators';
import { PageAwaiter } from './await.step';
import { BaseStep } from './base';

@autobind
export class OptionSelector extends BaseStep {
  constructor(private _options: OptionSelectorOptions) {
    super();
  }

  public async execute() {
    try {
      console.log('Selecting option');
      const { selector, value } = this._options;

      return this.page.select(selector, value).then(() => new PageAwaiter({ waitTime: 50 }).execute());
    } catch (error) {
      console.log(error);
    }
  }
}
