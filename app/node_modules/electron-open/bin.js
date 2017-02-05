#!/usr/bin/env node

var electron = require('electron-prebuilt')

var proc = require('child_process')

proc.spawn(electron, [__dirname + '/index.js', process.argv[2]], {stdio: 'inherit'});
