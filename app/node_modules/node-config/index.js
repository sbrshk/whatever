var sys = require('sys'),
    EventEmitter = require('events').EventEmitter,
    p = require('child_process'),
    path = require('path');

// By default node-config is going to look for 'conf' folder in curent directory.
// You can change that by changing the currentDirectory property
exports.currentDirectory = process.cwd();

function _addProperty(property_name, conf) {
    Object.defineProperty(
        exports,
        property_name,
        {
            get: function() {
                return conf[property_name];
            },
            enumerable: true,
            configurable: true
        }
    );
}

function _processProperties(collection) {
    for(property in collection) {
        if(collection.hasOwnProperty(property)) {
            _addProperty(property, collection);
        }
    }
}

function _initInternal(hostname, callback) {
    var conf = null,
       conf_path = null;

    //
    // First of all, retrieve common properties
    //
    var conf_path = path.join(exports.currentDirectory,
                              'conf', 
                              'common.js');
    try {
        conf = require(conf_path).conf;
        _processProperties(conf);
    } catch(err) {
        sys.log('Unable to locate file ' + conf_path);
        callback(err);
        return;
    }

    //
    // Then load host-specific ones.
    // This is optional since there might be no host config.
    //
    try {
        var conf_path = path.join(exports.currentDirectory,
                                  'conf',
                                  hostname + '.js')
        conf = require(conf_path).conf;
        _processProperties(conf);
    } catch(err) {}

    callback(null);
}

//
// You can force node-config to pick up config file different to your hostname,
// by supplying hostname parameter (omitting .js), i.e.
//
// initConfig(myCallback, 'my-host'); // assuming that ./conf/my-host.js exists
//
exports.initConfig = function(callback, hostname) {

    //
    // If hostname is set by user, do not invoke the 'hostname'
    // command line tool. However still behave in the async fashion.
    //
    if(hostname) {
        var eventEmitter = new EventEmitter();
        eventEmitter.on('init',
            function() {
                _initInternal(hostname, callback);
            }
        );

        eventEmitter.emit('init');
        return;
    }

    // No hostname supplied, obtain hostname andproceed to initialisation.
    hostnameProg = p.spawn('hostname');

    hostnameProg.stdout.on('data', function(data) {
        var _hostname = String(data).replace('\n', '');
        _initInternal(_hostname, callback);
    });

    hostnameProg.stderr.on('data', function(data) {
        callback(data);
    });
}
