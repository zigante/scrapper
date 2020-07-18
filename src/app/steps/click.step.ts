import { ElementClickerOptions } from '@/core';
import { autobind } from 'core-decorators';
import { ElementHandle, MouseButtons } from 'puppeteer';
import { PageAwaiter } from './await.step';
import { BaseStep } from './base';

@autobind
export class ElementClicker extends BaseStep {
  constructor(private _options: ElementClickerOptions) {
    super();
  }

  public async execute() {
    console.log('Clicking');
    const { selector, usePointer = true, button = 'left', waitTime = 200 } = this._options;

    const element = await this.page.$(selector);
    if (!element) throw new Error(`Elemente ${selector} does not exist`);

    !!usePointer ? await this.clickWithPointer(element, button) : await this.directClick(element, button);

    return this.page
      .waitForNavigation({ waitUntil: 'networkidle0' })
      .then(() => new PageAwaiter({ waitTime }).execute())
      .catch(({ message }: Error) => console.log(message));
  }

  private clickWithPointer = (element: ElementHandle<Element>, button: MouseButtons) =>
    element.click({ button, delay: 200, clickCount: 1 });

  private directClick = (element: ElementHandle<Element>, button: MouseButtons) =>
    element.click({ clickCount: 1, button });
}
