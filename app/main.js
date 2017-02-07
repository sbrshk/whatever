"use strict"

const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
// Module to create tray icon
const Tray = electron.Tray 
// Module to create context meny for tray icon
const Menu = electron.Menu 

const shell = electron.shell

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, splashScreen, tray

function createSplashScreen () {
    splashScreen = new BrowserWindow({width: 600,
                                      height: 400, 
                                      frame: false, 
                                      show: false
    })
    splashScreen.loadURL(url.format({
    pathname: path.join(__dirname, 'splash.html'),
    protocol: 'file:',
    slashes: true
    }))
    
    splashScreen.webContents.on('did-finish-load', () => {
        splashScreen.show()
    })
}

function createTray () {
    //create tray icon
    tray = new Tray(path.join(__dirname, 'tray/18x18.png'))
        
    //Create context menu
    const contextMenu = Menu.buildFromTemplate([
        {label: "Open Whatever", click() { createWindow() }},
        {type: "separator"},
        //{label: "New note", click() { newNote() }},
        {label: "Settings", click() { openSettings() }},
        {label: "Quit", click() { app.quit() }},
        {type: "separator"},
        {label: "About", click() { createAboutWindow() }},
        {label: "GitHub", click() {
            shell.openExternal('https://github.com/CellarD0-0r/whatever')
        }}
    ])
    tray.setContextMenu(contextMenu)
}

function createWindow () {
  
  createSplashScreen()
  
  // Create the browser window and disable node.js (it is needed to work with pre-compiled js of external url)
  mainWindow = new BrowserWindow({width: 800, 
                                  height: 600, 
                                  webPreferences: {nodeIntegration: false}, 
                                  show: false
                                 })

  // and load the url
  mainWindow.loadURL('https://www.evernote.com/Home.action')
  
  //mainWindow.webContents.on('did-finish-load', () => {
  mainWindow.once('ready-to-show', () => {
      mainWindow.show()
      if(splashScreen) {
          splashScreen.close()
      }
  })

  // Emitted when the window is closed.
  mainWindow.on('close', function () {
    if (mainWindow) { mainWindow.hide() }
  })
}

function openSettings () {
    mainWindow = new BrowserWindow({width: 800, 
                                  height: 600, 
                                  webPreferences: {nodeIntegration: false}})
    mainWindow.loadURL('https://www.evernote.com/Settings.action')
}

function createAboutWindow () {
    
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
app.on('ready', createTray)

// Quit when all windows are closed.
/*app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})*/

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})