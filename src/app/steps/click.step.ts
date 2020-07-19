import { ElementClickerOptions, Result } from '@/core';
import { autobind } from 'core-decorators';
import { PageAwaiter } from './await.step';
import { BaseStep } from './base';

@autobind
export class ElementClicker extends BaseStep {
  constructor(private _options: ElementClickerOptions) {
    super();
  }

  public async execute(result: Result) {
    const { waitTime = 200, isNavigation } = this._options;

    await this.executeElementClicker().catch(({ message }: Error) => {
      result.warnings.push(message);
      console.debug(message);
    });

    if (!!isNavigation)
      this.navigate().catch(({ message }: Error) => {
        result.warnings.push(message);
        console.debug(message);
      });

    return new PageAwaiter({ waitTime }).execute(result);
  }

  private async executeElementClicker() {
    const { selector, button = 'left' } = this._options;

    const element = await this.page.$(selector);
    if (!element) throw new Error(`Elemente ${selector} does not exist`);

    return element.click({ button, delay: 200, clickCount: 1 }).then(() => console.debug(`Clicked on "${selector}".`));
  }

  private navigate = () =>
    Promise.resolve(console.debug('Waiting end of page navigation.')).then(() =>
      this.page.waitForNavigation({ waitUntil: 'networkidle0' }),
    );
}
