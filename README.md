# @zigtech/scrapper

Fast, easy and full typed scrapper.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

```ts
import { JobStep, Page } from '@zigtech/scrapper';

const run = async (page: Page) => {
  await page.open();

  const { step, options }: JobStep<'navigate'> = {
    step: 'navigate',
    options: {
      url: 'https://google.com',
      waitTime: 1000,
    },
  };

  await page.processStep(step, options);
  await page.close();
};

run(new Page());
```

[npm-image]: https://img.shields.io/npm/v/@zigtech/scrapper.svg
[npm-url]: https://npmjs.org/package/@zigtech/scrapper
[downloads-image]: https://img.shields.io/npm/dm/@zigtech/scrapper.svg
[downloads-url]: https://npmcharts.com/compare/@zigtech/scrapper?minimal=true
