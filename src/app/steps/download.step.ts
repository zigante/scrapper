import { ContentOptions, Result } from '@/core';
import { autobind } from 'core-decorators';
import { writeFileSync } from 'fs';
import { PageAwaiter } from './await.step';
import { BaseStep } from './base';

@autobind
export class PageDownloader extends BaseStep {
  constructor(private _options: ContentOptions) {
    super();
  }

  public async execute(result: Result): Promise<void> {
    try {
      console.debug('Downloading page');
      const { path } = this._options;

      const content = await this.page.content();
      const htmlFileContent = Buffer.from(content);

      writeFileSync(`${path}/index.html`, htmlFileContent, { encoding: 'base64' });
      result.pageDownload = true;

      return new PageAwaiter({ waitTime: 50 }).execute(result);
    } catch (error) {
      const message = (error as Error).message;

      result.warnings.push(message);
      console.debug(message);
    }
  }
}
