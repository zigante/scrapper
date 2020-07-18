# @zigtech/scrapper

Fast, easy and full typed scrapper.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]

```ts
import { JobStep, Page } from '@zigtech/scrapper';

const run = async (page: Page) => {
  await page.open();

  const { step, options }: JobStep<'navigate'> = {
    step: 'navigate',
    options: {
      url: 'https://github.com/zigante/scrapper',
      waitTime: 1000,
    },
  };

  await page.processStep(step, options);
  await page.close();
};

run(new Page({ resultPath: './tmp' }));
```

## Instalation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$$ npm install --save @zigtech/scrapper
```

[npm-image]: https://img.shields.io/npm/v/@zigtech/scrapper.svg
[npm-url]: https://npmjs.org/package/@zigtech/scrapper
[downloads-image]: https://img.shields.io/npm/dm/@zigtech/scrapper.svg
[downloads-url]: https://npmcharts.com/compare/@zigtech/scrapper?minimal=true
[travis-image]: https://travis-ci.com/zigante/scrapper.svg?branch=stable
[travis-url]: https://travis-ci.com/zigante/scrapper
