import { UrlNavigatorOptions } from '@/core';
import { autobind } from 'core-decorators';
import { URL } from 'url';
import { PageAwaiter } from './await.step';
import { BaseStep } from './base';

@autobind
export class UrlNavigator extends BaseStep {
  constructor(private _options: UrlNavigatorOptions) {
    super();
  }

  public async execute(): Promise<void> {
    try {
      console.log('Navigating to url');
      const { url, waitTime = 200 } = this._options;
      const urlToNavigate = new URL(url).toString();

      await this.page.goto(urlToNavigate, { waitUntil: 'networkidle0' });
      return new PageAwaiter({ waitTime }).execute();
    } catch (error) {
      console.log(error);
    }
  }
}
