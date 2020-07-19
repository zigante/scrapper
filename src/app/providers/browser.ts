import { PageConfigs } from '@/core';
import { executablePath } from 'chrome-aws-lambda';
import { autobind } from 'core-decorators';
import Puppeteer, { Browser, LaunchOptions, Page } from 'puppeteer';

@autobind
export class BrowserProvider {
  private static _browserInstance: Promise<Browser>;

  private constructor(private _configs: PageConfigs) {
    BrowserProvider._browserInstance = this.launch();
  }

  public static async getBrowser(configs: PageConfigs): Promise<Page> {
    if (!this._browserInstance) new BrowserProvider(configs);

    return this._browserInstance.then(browser => browser.newPage());
  }
  public static countOpenedPages = () =>
    BrowserProvider._browserInstance.then(browser => browser.pages()).then(pages => pages.length);

  public static closeBrowser = () => BrowserProvider._browserInstance.then(browser => browser.close());

  private launch = (): Promise<Browser> => this.getOptions().then(options => Puppeteer.launch({ ...options }));

  private async getOptions(): Promise<LaunchOptions> {
    const { headless, instanceType, plataform } = this._configs;

    const args = [
      '--disable-gpu',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-notifications',
      '--disable-dev-shm-usage',
      '--memory-pressure-off',
      '--ignore-certificate-errors',
    ];
    if ('linux' === instanceType) args.push('--single-process');

    console.debug(`Headless mode: ${!!headless}`);
    const options: LaunchOptions = {
      args,
      headless: !!headless,
      timeout: 0,
      ignoreHTTPSErrors: true,
    };
    if ('lambda' === plataform) options.executablePath = await executablePath;

    return options;
  }
}
