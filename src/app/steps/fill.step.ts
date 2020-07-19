import { InputFillerOptions, Result } from '@/core';
import { autobind } from 'core-decorators';
import { PageAwaiter } from './await.step';
import { BaseStep } from './base';

@autobind
export class InputFiller extends BaseStep {
  constructor(private _options: InputFillerOptions) {
    super();
  }

  public async execute(result: Result): Promise<void> {
    console.debug('Filling input');
    const { waitTime = 200, selector, value } = this._options;

    await this.executeInputFiller().catch(({ message }: Error) => {
      result.warnings.push(message);
      console.debug(message);
    });

    console.debug(`Set value of "${selector}" to "${value}"`);

    new PageAwaiter({ waitTime }).execute(result);
  }

  private async executeInputFiller() {
    const { selector, value, delay = 100 } = this._options;

    const element = await this.page.$(selector);
    if (!element) throw new Error(`Elemente ${selector} does not exist`);

    return element.type(value, { delay });
  }
}
