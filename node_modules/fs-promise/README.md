# fs-promise

[![Build Status](https://secure.travis-ci.org/kevinbeaty/fs-promise.svg)](http://travis-ci.org/kevinbeaty/fs-promise)


```javascript
var fsp = require('fs-promise');

fsp.writeFile('/tmp/hello1.txt', 'hello world')
  .then(function(){
    return fsp.readFile('/tmp/hello1.txt', {encoding:'utf8'});
  })
  .then(function(contents){});
```

## Implementation

`fs-promise` is now a thin wrapper on top of [`mz/fs`][4] adding support for async functions from [`fs-extra`][2]. If you do not need the functions from `fs-extra`, consider using `mz` directly.

* Proxies async [`fs`][1] and [`fs-extra`][2] methods exposing them as ES 2015 (ES6) compatible promises.
* Uses [any-promise][3] to load preferred `Promise` implementation.
* Directly uses [mz/fs][4] for all `fs` functions.
* Proxies `walk` from `fs-extra` to resolve Promise as arrays of items.
* Proxies the following functions from fs-extra using [thenify-all][5]. (Proxies all other functions directly).

```javascript
[
  'copy',
  'emptyDir',
  'ensureFile',
  'ensureDir',
  'ensureLink'
  'ensureSymlink',
  'mkdirs',
  'move',
  'outputFile',
  'outputJson',
  'readJson',
  'remove',
  'writeJson'
]
```

## Usage

Detects a `Promise` implementation using [`any-promise`][3]. If you have a preferred implementation, or are working in an environment without a global implementation, you must explicitly register a `Promise` implementation and it will be used. See [`any-promise`][3] for details.

Typical installation:

```bash
$ npm install --save fs-promise
```

Note that `fs-extra` depends on `graceful-fs`, so you will get the benefits of both libraries.

[1]: https://nodejs.org/api/fs.html
[2]: https://www.npmjs.org/package/fs-extra
[3]: https://github.com/kevinbeaty/any-promise
[4]: https://github.com/normalize/mz
[5]: https://github.com/thenables/thenify-all
