#! /usr/bin/env node

const openElectron = require('..');

function parseIntArg(name, argv) {
    const name_idx = argv.indexOf(`--${name}`);
    if (name_idx == argv.length - 1 || name_idx < 0) {
        return undefined;
    }

    const i = parseInt(argv[name_idx + 1], 10);
    if (isNaN(i) || i === 0) {
        return undefined;
    }

    argv.splice(name_idx, 2);
    return i;
}

function parseArgv(argv) {
    if (argv.indexOf('--help') !== -1) {
        return {
            help: true
        };
    }

    const fallback_idx = argv.indexOf('--with-fallback');
    if (fallback_idx >= 0) {
        argv.splice(fallback_idx, 1);
    }

    const without_focus_idx = argv.indexOf('--without-focus');
    if (without_focus_idx >= 0) {
        argv.splice(without_focus_idx, 1);
    }

    const always_on_top_idx = argv.indexOf('--always-on-top');
    if (always_on_top_idx >= 0) {
        argv.splice(always_on_top_idx, 1);
    }

    const width = parseIntArg('width', argv);
    const height = parseIntArg('height', argv);

    if (argv.length === 0) {
        return {
            error: 'target to open was not found.'
        };
    }

    return {
        target: argv[0],
        fallback: fallback_idx >= 0,
        focus: without_focus_idx < 0,
        alwaysOnTop: always_on_top_idx >= 0,
        width,
        height,
    };
}

const parsed = parseArgv(process.argv.slice(2));
if (parsed.help) {
    process.stderr.write(
`$ electron-open {something} [Options]

Description:
    Open something in Electron window.

Options:
    {something}
        Target to open. You can path URL (starts with 'http://' or 'https://'),
        file path and so on.

    --with-fallback
        When 'electron' package is not found, fallback to system's open method.

    --width {px}
        Specify window width by pixel.

    --height {px}
        Specify window height by pixel.

    --without-focus
        Do not focus a window.

    --always-on-top
        Show a window always on top of desktop.

    --help
        Show this help.

`
    );
    process.exit(0);
}

try {
    openElectron(parsed);
} catch (e) {
    process.stderr.write('Error: ' + e.message + ' Please see --help for more detail.\n');
}
