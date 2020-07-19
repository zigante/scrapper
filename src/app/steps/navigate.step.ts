import { Result, UrlNavigatorOptions } from '@/core';
import { autobind } from 'core-decorators';
import { URL } from 'url';
import { PageAwaiter } from './await.step';
import { BaseStep } from './base';

@autobind
export class UrlNavigator extends BaseStep {
  private readonly allowedStatusCodes = [200, 302, 301, 307];
  constructor(private _options: UrlNavigatorOptions) {
    super();
  }

  public async execute(result: Result): Promise<void> {
    try {
      const { url, waitTime = 200 } = this._options;

      console.debug(`Navigating to ${url}`);

      const response = await this.page.goto(new URL(url).toString(), { waitUntil: 'networkidle0' });
      const statusCode = Number(response?.status());

      if (!this.allowedStatusCodes.includes(statusCode))
        result.errors.push(`URL can't be scrapped; status '${statusCode}'`);

      return new PageAwaiter({ waitTime }).execute(result);
    } catch (error) {
      const message = (error as Error).message;

      result.warnings.push(message);
      console.debug(message);
    }
  }
}
