import { InputFillerOptions } from '@/core';
import { autobind } from 'core-decorators';
import { PageAwaiter } from './await.step';
import { BaseStep } from './base';

@autobind
export class InputFiller extends BaseStep {
  constructor(private _options: InputFillerOptions) {
    super();
  }

  public async execute(): Promise<void> {
    try {
      console.log('Filling input');
      const { selector, value, delay = 100, waitTime = 200 } = this._options;

      const element = await this.page.$(selector);
      if (!element) throw new Error(`Elemente ${selector} does not exist`);

      return element.type(value, { delay }).then(() => new PageAwaiter({ waitTime }).execute());
    } catch (error) {
      console.log(error);
    }
  }
}
