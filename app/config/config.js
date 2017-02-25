/*const Config = require('electron-config')

const config = new Config({
    defaults: {
        autoStart: false,
        backgroundMode: true,
        colorTheme: "classic"
    }
})

module.exports.config = config*/

nconf.argv()
    .env()
    .file({file: path.join(__dirname, 'config.json')});

module.exports = nconf;


