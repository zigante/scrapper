import { MouseButtons, Page } from 'puppeteer';
import { BaseStep } from '@/app/steps/base';

export interface IBaseStep {
  on(page: Page): BaseStep;
  execute(): Promise<void>;
}

export type Steps = 'click' | 'await' | 'navigate' | 'screenshot' | 'download' | 'fill' | 'select';

export type StepOption<T extends Steps> = T extends 'click'
  ? ElementClickerOptions
  : T extends 'await'
  ? PageAwaiterOptions
  : T extends 'navigate'
  ? UrlNavigatorOptions
  : T extends 'screenshot' | 'download'
  ? ContentOptions
  : T extends 'fill'
  ? InputFillerOptions
  : T extends 'select'
  ? OptionSelectorOptions
  : never;

export type ElementClickerOptions = {
  selector: string;
  usePointer?: boolean;
  waitTime?: number;
  button?: MouseButtons;
};

export type PageAwaiterOptions = {
  waitTime: number;
};

export type UrlNavigatorOptions = {
  url: string;
  waitTime?: number;
};

export type ContentOptions = {
  path: string;
};

export type InputFillerOptions = {
  selector: string;
  value: string;
  delay?: number;
  waitTime?: number;
};

export type OptionSelectorOptions = {
  selector: string;
  value: string;
};

export type JobStep<T extends Steps> = {
  step: Steps;
  options: StepOption<T>;
};
