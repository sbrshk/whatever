electron-open-url
=================

This is a package to open something with Electron window. You can use this from both command line and Node.js program.

This program continues to use the same window. So it does not open multiple tabs when you use this package repeatedly. This package is assumed to be used from other command line tools, editors or Node.js programs which opens some web page or file repeatedly.

## Install

```
$ npm install -g electron-open-url electron
```

Note that this package registers 'electron' package as peer dependency. So you need to install it additinally. This is because make users to determine where the 'electron' package should be installed.

## Usage

### From command line

![screen shot](https://github.com/rhysd/ss/blob/master/electron-open-url/main.gif?raw=true)

`electron-open` command is available.

For example, below opens Twitter page with Electron window.

```
$ electron-open https://twitter.com/
```

You want to open Twitter's Notification page. Then simply execute below.

```
$ electron-open https://twitter.com/i/notifications
```

The notification page will be opened in the same window.

For more usage, please check `electron-open --help`.

### From Node.js program

```javascript
const open = require('electron-open');

open({
    target: 'https://twitter.com',
    fallback: true
});
```

The `target` property is a thing you want to open in Electron window. If `fallback` property is set to `true`, it opens with OS's open method (like `open` command in macOS or `xdg-open` in X11) when 'electron' package was not found.

