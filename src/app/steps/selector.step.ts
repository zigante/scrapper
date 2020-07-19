import { OptionSelectorOptions, Result } from '@/core';
import { autobind } from 'core-decorators';
import { PageAwaiter } from './await.step';
import { BaseStep } from './base';

@autobind
export class OptionSelector extends BaseStep {
  constructor(private _options: OptionSelectorOptions) {
    super();
  }

  public async execute(result: Result) {
    const { selector, value } = this._options;

    console.debug(`Selecting option ${value}`);

    await this.page.select(selector, value).catch(({ message }: Error) => {
      result.warnings.push(message);
      console.debug(message);
    });

    return new PageAwaiter({ waitTime: 50 }).execute(result);
  }
}
