const path = require('path');
const child_process = require('child_process');
const openFallback = require('open');

let electron;
try {
    electron = require('electron');
} catch (e) {
    electron = null;
}

function open(parsed) {
    if (typeof parsed === 'string') {
        parsed = { target: parsed };
    }

    if (parsed.error) {
        throw new Error(parsed.error);
    }

    if (electron === null) {
        if (parsed.fallback) {
            openFallback(parsed.target);
        } else {
            throw new Error('Electron binary was not found. Please ensure to install "electron" package in your machine.');
        }
    }

    const args = [
        path.join(__dirname, 'app'),
        parsed.target
    ];

    if (parsed.width) {
        args.push('--width', parsed.width);
    }
    if (parsed.height) {
        args.push('--height', parsed.height);
    }
    if (parsed.focus === false) {
        args.push('--without-focus');
    }
    if (parsed.alwaysOnTop) {
        args.push('--always-on-top');
    }

    child_process.spawn(electron, args, {
        stdio: 'ignore',
        detached: true
    }).unref();
}

module.exports = open;
