import { ContentOptions } from '@/core';
import { autobind } from 'core-decorators';
import { PageAwaiter } from './await.step';
import { BaseStep } from './base';

@autobind
export class ScreenshotTaker extends BaseStep {
  constructor(private _options: ContentOptions) {
    super();
  }

  public async execute(): Promise<void> {
    try {
      console.log('Taking screenshot');
      const { path } = this._options;

      const docHeight = await this.page
        .evaluate(() => document.documentElement.scrollHeight)
        .then(scrollHeight => Math.round(scrollHeight / 3))
        .catch(() => 1500);

      await this.page
        .setViewport({ width: 1366, height: Math.abs(3000 - docHeight) })
        .then(() => this.page.screenshot({ fullPage: true, path: `${path}/screenshot.jpeg`, type: 'jpeg' }));

      return new PageAwaiter({ waitTime: 50 }).execute();
    } catch (error) {
      console.log(error);
    }
  }
}
