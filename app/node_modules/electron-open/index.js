#!/usr/bin/env electron

var app = require('app')
var BrowserWindow = require('browser-window')

app.on('ready', function () {
  var windo = new BrowserWindow({
    title: 'electron-url',
    width: 960,
    height: 470,
    show: true,
    transparent: false
  })
  console.log(process.argv[2])
  windo.loadUrl(process.argv[2])
})
