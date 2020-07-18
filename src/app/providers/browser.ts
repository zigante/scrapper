import { executablePath } from 'chrome-aws-lambda';
import { autobind } from 'core-decorators';
import Puppeteer, { Browser, LaunchOptions, Page } from 'puppeteer';
import { Config, ScrapperConfigs } from '@/core';

@autobind
export class BrowserProvider {
  private static _browserInstance: Promise<Browser>;
  private _scrapperConfigs = Config.get<ScrapperConfigs>('SCRAPPER');

  private constructor() {
    BrowserProvider._browserInstance = this.launch();
  }

  public static async getBrowser(): Promise<Page> {
    if (!this._browserInstance) new BrowserProvider();

    return this._browserInstance.then(browser => browser.newPage());
  }
  public static countOpenedPages = () =>
    BrowserProvider._browserInstance.then(browser => browser.pages()).then(pages => pages.length);

  public static closeBrowser = () => BrowserProvider._browserInstance.then(browser => browser.close());

  private launch = (): Promise<Browser> => this.getOptions().then(options => Puppeteer.launch({ ...options }));

  private async getOptions(): Promise<LaunchOptions> {
    const { plataform } = this._scrapperConfigs;
    const plataformIsLambda = 'lambda' === plataform?.toLowerCase();

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
    if (plataformIsLambda) args.push('--single-process');

    console.log(`Headless mode: ${plataformIsLambda}`);
    const options: LaunchOptions = {
      args,
      headless: plataformIsLambda,
      timeout: 0,
      ignoreHTTPSErrors: true,
    };
    if (plataformIsLambda) options.executablePath = await executablePath;

    return options;
  }
}
