import { IBaseStep } from '@/core';
import { autobind } from 'core-decorators';
import { Page } from 'puppeteer';

@autobind
export abstract class BaseStep implements IBaseStep {
  private _pageToScrape: Page | null = null;

  get page(): Page {
    if (!this._pageToScrape) throw new Error('No page to be scrapped');
    return this._pageToScrape;
  }

  public on(page: Page): BaseStep {
    this._pageToScrape = page;
    return this;
  }

  abstract async execute(): Promise<void>;
}
