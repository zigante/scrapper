import { PageConfigs, Result, StepOption, Steps } from '@/core';
import * as TYPES from '@/core/types/steps.types';
import { autobind } from 'core-decorators';
import { Page } from 'puppeteer';
import * as STEPS from '../steps';
import { BaseStep } from '../steps/base';
import { BrowserProvider } from './browser';

@autobind
export class PageProvider {
  private _page!: Page;
  private _results: Result = {
    dateTime: new Date(),
    errors: [],
    pageDownload: false,
    screenshotTaked: false,
    warnings: [],
  };

  constructor(private _configs: PageConfigs) {}

  public async open(): Promise<Page> {
    this._page = await BrowserProvider.getBrowser(this._configs);
    this._page.setDefaultNavigationTimeout(60000);

    return this._page;
  }

  public processStep = <T extends Steps>(step: T, options: StepOption<T>): Promise<void> =>
    this.steps<T>(options) /* eslint-disable no-unexpected-multiline */
      [step].on(this._page)
      .execute(this._results)
      .catch(({ message }: Error) => {
        this._results.errors.push(message);
        console.debug(message);
      });

  public async close(): Promise<void> {
    console.debug('Closing page');
    if (!this._page) throw new Error('Cannot close current page');
    this._results.finalUrl = this._page.url();

    const pages = await this._page.close().then(() => BrowserProvider.countOpenedPages());
    return pages > 1 ? Promise.resolve() : BrowserProvider.closeBrowser();
  }

  private steps = <T extends Steps>(options: StepOption<T>): Record<Steps, BaseStep> => ({
    click: new STEPS.ElementClicker(options as TYPES.ElementClickerOptions),
    await: new STEPS.PageAwaiter(options as TYPES.PageAwaiterOptions),
    navigate: new STEPS.UrlNavigator(options as TYPES.UrlNavigatorOptions),
    download: new STEPS.PageDownloader({ path: this._configs.resultPath, ...options } as TYPES.ContentOptions),
    screenshot: new STEPS.ScreenshotTaker({ path: this._configs.resultPath, ...options } as TYPES.ContentOptions),
    fill: new STEPS.InputFiller(options as TYPES.InputFillerOptions),
    select: new STEPS.OptionSelector(options as TYPES.OptionSelectorOptions),
  });

  public getResults = (): Result => ({
    ...this._results,
    dateTime: new Date(),
  });
}
