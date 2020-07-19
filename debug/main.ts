import { JobStep, Page, ScrapperOptions } from '../src';

const run = async () => {
  const options: ScrapperOptions = {
    resultPath: './tmp',
    headless: false,
    instanceType: 'other',
    plataform: 'other',
  };
  const page = new Page({ ...options });

  await page.open();

  const stepOne: JobStep<'navigate'> = {
    step: 'navigate',
    options: {
      url: 'https://github.com/zigante/scrapper',
      waitTime: 1000,
    },
  };

  const stepTwo: JobStep<'click'> = {
    step: 'click',
    options: {
      selector: '.any > #selector',
      waitTime: 1000,
    },
  };

  const steps = [stepOne, stepTwo];
  for (const { options, step } of steps) {
    console.log('Running ' + step);
    await page.processStep(step, options).catch(({ message }: Error) => console.error(message));
  }

  await page.close();

  const result = page.getResults();

  return result;
};

run();
