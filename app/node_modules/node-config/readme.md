## Description
Lightweight configuration engine for node.js

Allows you to have a common configuration file with an ability to override particular
settings in host-specific configuratin files.

## How it works
For example, certain settings, like name of your application, does not depend
on the environment (production/dev/CI), hence never changes:

conf/common.js:
    exports.conf = {
        name: 'My Super Awesome Kick Ass Startup'
    }

but the connection string to the database is different in case of
CI/Dev/Production machines:

conf/ci-hostname.js:
    exports.conf = {
        db_connection: 'ci.mongo-db.local'
    }

conf/my-dev.js:
    exports.conf = {
        db_connection: 'localhost'
    }

conf/linode.beefed-up.server.com.js:
    exports.conf = {
        db_connection: 'nosql-super-clustered-cloud-database'
    }

where ci-hostname/my-dev/linode.beefed-up.server.com are corresponding
hostnames.

Node-config will load common configuration values and then override them with
appropriate values from host-specific config file.

## Example

Loading of configuration is as simple as this:

    // Presuming that node-config sits under ./external folder in the project
    require.paths.unshift('./external');

    var conf = require('node-config'),
        sys = require('sys');

    conf.initConfig(
        function(err) {
            if(err) {
                sys.log('Unable to init the config: ' + err); 
                return;
            }

            // Config loaded, can do those things now:

            console.log(conf.db_connection);
        }
    );

For testing purposes you can override your hostname by supplying second argument 
to initConfig() function, just like that:

    conf.initConfig(
        function(err) { // your normal stuff goes here... },
        'redefined-host-name'
    );

which will force node-config to load conf/redefined-host-name.js instead of your
host-specific config.


## Setup

You need to have a `conf` directory in your project root folder (where your
main .js file sits), and it has to contain`common.js` file with following
format:
    
    exports.conf = {
        name: 'value',
        // ...
        name_m: 'value M'
    };

If you wish to add host-specific config files, execute `hostname` from command
line to find out what your hostname is and name your config file accordingly.

Please see `node-config/conf/*` and `node-config/test.js` for examples.

Thanks!

## License

The MIT License

Copyright (c) 2010 by Artem Skvira

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
