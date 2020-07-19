import { JobStep, Page } from '../src';

const run = async () => {
  const page = new Page({ resultPath: './tmp' });
  await page.open();

  const stepOne: JobStep<'navigate'> = {
    step: 'navigate',
    options: {
      url: 'https://www.gosdsogle.com',
      waitTime: 1000,
    },
  };

  const stepTwo: JobStep<'click'> = {
    step: 'click',
    options: {
      selector: 'sahdjka',
      waitTime: 1000,
    },
  };

  for (const { options, step } of [stepOne, stepTwo]) {
    console.log('Running ' + step);
    await page.processStep(step, options).catch(({ message }: Error) => console.error(message));
  }

  await page.close();

  const result = page.getResults();

  return result;
};

run();
