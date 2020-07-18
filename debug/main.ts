import { JobStep, Page } from '../src';

const run = async () => {
  const page = new Page();
  await page.open();

  const stepOne: JobStep<'navigate'> = { step: 'navigate', options: { url: 'https://google.com', waitTime: 1000 } };

  for (const { options, step } of [stepOne]) {
    console.log('Running ' + step);
    await page.processStep<typeof step>(step, options).catch(({ message }: Error) => console.error(message));
  }

  await page.close();
};

run();
