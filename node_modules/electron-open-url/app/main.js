const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs');

win = null;

function getUrlToOpen(argv) {
    const url = argv[2];
    if (url.startsWith('https://') || url.startsWith('http://') || url.startsWith('file://')) {
        return url;
    }

    try {
        if (fs.statSync(url).isFile()) {
            return 'file://' + url;
        }
    } catch (e) {
        return '';
    }

    return '';
}

function getWindowSize(argv) {
    const size = {
        height: undefined,
        width: undefined
    };

    const wi = argv.indexOf('--width');
    if (wi !== -1) {
        size.width = parseInt(argv[wi + 1], 10);
    }

    const hi = argv.indexOf('--height');
    if (hi !== -1) {
        size.height = parseInt(argv[hi + 1], 10);
    }

    return size;
}

function shouldFocus(argv) {
    return argv.indexOf('--without-focus') < 0;
}

function alwaysOnTop(argv) {
    return argv.indexOf('--always-on-top') >= 0;
}

const shouldQuit = app.makeSingleInstance((argv, workdir) => {
    if (win !== null) {
        if (win.isMinimized(0)) {
            win.restore();
        }

        const size = getWindowSize(argv);
        if (size.width || size.height) {
            win.setSize(size.width, size.height);
        }

        win.loadURL(getUrlToOpen(argv));
        if (shouldFocus(argv)) {
            win.focus();
        }

        const fixOnTop = alwaysOnTop(argv);
        if (fixOnTop && !win.isAlwaysOnTop()) {
            win.setAlwaysOnTop(true);
        } else if (!fixOnTop && win.isAlwaysOnTop()) {
            win.setAlwaysOnTop(false);
        }
    }
});

if (shouldQuit) {
    app.quit();
}

app.once('ready', () => {
    const size = getWindowSize(process.argv);

    win = new BrowserWindow({
        width: size.width || 1000,
        height: size.height || 800,
        show: false,
        alwaysOnTop: alwaysOnTop(process.argv),
        webPreferrences: {
            nodeIntegration: false,
            sandbox: true
        }
    });

    win.once('closed', () => {
        win = null;
    })

    win.once('ready-to-show', () => {
        if (shouldFocus(process.argv)) {
            win.show();
        } else {
            win.showInactive();
        }
    });

    win.loadURL(getUrlToOpen(process.argv));
});
