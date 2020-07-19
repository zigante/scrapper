import { ContentOptions, Result } from '@/core';
import { autobind } from 'core-decorators';
import { PageAwaiter } from './await.step';
import { BaseStep } from './base';

@autobind
export class ScreenshotTaker extends BaseStep {
  constructor(private _options: ContentOptions) {
    super();
  }

  public async execute(result: Result): Promise<void> {
    try {
      console.debug('Taking screenshot');
      const { path } = this._options;

      const docHeight = await this.page
        .evaluate(() => document.documentElement.scrollHeight)
        .then(scrollHeight => Math.round(scrollHeight / 3))
        .catch(() => 1500);

      await this.page
        .setViewport({ width: 1366, height: Math.abs(3000 - docHeight) })
        .then(() => this.page.screenshot({ fullPage: true, path: `${path}/screenshot.jpeg`, type: 'jpeg' }));

      result.screenshotTaked = true;

      return new PageAwaiter({ waitTime: 200 }).execute(result);
    } catch (error) {
      const message = (error as Error).message;

      result.warnings.push(message);
      console.debug(message);
    }
  }
}
