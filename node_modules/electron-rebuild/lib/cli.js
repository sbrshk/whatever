#!/usr/bin/env node
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

require('colors');

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _rebuild = require('./rebuild.js');

var _rebuild2 = _interopRequireDefault(_rebuild);

var _electronLocater = require('./electron-locater');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var yargs = require('yargs').usage('Usage: electron-rebuild --version [version] --module-dir [path]').help('h').alias('h', 'help').describe('v', 'The version of Electron to build against').alias('v', 'version').describe('f', 'Force rebuilding modules, even if we would skip it otherwise').alias('f', 'force').describe('a', "Override the target architecture to something other than your system's").alias('a', 'arch').describe('m', 'The path to the node_modules directory to rebuild').alias('m', 'module-dir').describe('w', 'A specific module to build, or comma separated list of modules').alias('w', 'which-module').describe('e', 'The path to electron-prebuilt').alias('e', 'electron-prebuilt-dir').describe('d', 'Custom header tarball URL').alias('d', 'dist-url').describe('t', 'The types of dependencies to rebuild.  Comma seperated list of "prod", "dev" and "optional".  Default is "prod,optional"').alias('t', 'types').describe('p', 'Rebuild in parallel, this is enabled by default on macOS and Linux').alias('p', 'parallel').describe('s', 'Rebuild modules sequentially, this is enabled by default on Windows').alias('s', 'sequential').epilog('Copyright 2016');

var argv = yargs.argv;

if (argv.h) {
  yargs.showHelp();
  process.exit(0);
}

var handler = function handler(err) {
  console.error('An unhandled error occurred inside electron-rebuild'.red);
  console.error((err.message + '\n\n' + err.stack).red);
  process.exit(-1);
};
process.on('uncaughtException', handler);
process.on('unhandledRejection', handler);

(0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee() {
  var electronPrebuiltPath, electronPrebuiltVersion, pkgJson, rootDirectory, modulesDone, moduleTotal, rebuildSpinner, lastModuleName, redraw, rebuilder, lifecycle;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          electronPrebuiltPath = argv.e ? _path2.default.resolve(process.cwd(), argv.e) : (0, _electronLocater.locateElectronPrebuilt)();
          electronPrebuiltVersion = argv.v;

          if (electronPrebuiltVersion) {
            _context.next = 11;
            break;
          }

          _context.prev = 3;
          pkgJson = require(_path2.default.join(electronPrebuiltPath, 'package.json'));


          electronPrebuiltVersion = pkgJson.version;
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context['catch'](3);
          throw new Error('Unable to find electron-prebuilt\'s version number, either install it or specify an explicit version');

        case 11:
          rootDirectory = argv.m;

          if (rootDirectory) {
            _context.next = 34;
            break;
          }

          // NB: We assume here that we're going to rebuild the immediate parent's
          // node modules, which might not always be the case but it's at least a
          // good guess
          rootDirectory = _path2.default.resolve(__dirname, '../../..');
          _context.next = 16;
          return _fsPromise2.default.exists(rootDirectory);

        case 16:
          _context.t1 = !_context.sent;

          if (_context.t1) {
            _context.next = 21;
            break;
          }

          _context.next = 20;
          return _fsPromise2.default.exists(_path2.default.resolve(rootDirectory, 'package.json'));

        case 20:
          _context.t1 = !_context.sent;

        case 21:
          if (!_context.t1) {
            _context.next = 32;
            break;
          }

          // Then we try the CWD
          rootDirectory = process.cwd();
          _context.next = 25;
          return _fsPromise2.default.exists(rootDirectory);

        case 25:
          _context.t2 = !_context.sent;

          if (_context.t2) {
            _context.next = 30;
            break;
          }

          _context.next = 29;
          return _fsPromise2.default.exists(_path2.default.resolve(rootDirectory, 'package.json'));

        case 29:
          _context.t2 = !_context.sent;

        case 30:
          if (!_context.t2) {
            _context.next = 32;
            break;
          }

          throw new Error('Unable to find parent node_modules directory, specify it via --module-dir, E.g. "--module-dir ." for the current directory');

        case 32:
          _context.next = 35;
          break;

        case 34:
          rootDirectory = _path2.default.resolve(process.cwd(), rootDirectory);

        case 35:
          modulesDone = 0;
          moduleTotal = 0;
          rebuildSpinner = (0, _ora2.default)('Searching dependency tree').start();
          lastModuleName = void 0;

          redraw = function redraw(moduleName) {
            if (moduleName) lastModuleName = moduleName;
            if (argv.p) {
              rebuildSpinner.text = 'Building modules: ' + modulesDone + '/' + moduleTotal;
            } else {
              rebuildSpinner.text = 'Building module: ' + lastModuleName + ', Completed: ' + modulesDone;
            }
          };

          rebuilder = (0, _rebuild2.default)(rootDirectory, electronPrebuiltVersion, argv.a || process.arch, argv.w ? argv.w.split(',') : [], argv.f, argv.d, argv.t ? argv.t.split(',') : ['prod', 'dev'], argv.p ? 'parallel' : argv.s ? 'sequential' : undefined);
          lifecycle = rebuilder.lifecycle;

          lifecycle.on('module-found', function (moduleName) {
            moduleTotal += 1;
            redraw(moduleName);
          });
          lifecycle.on('module-done', function () {
            modulesDone += 1;
            redraw();
          });
          _context.prev = 44;
          _context.next = 47;
          return rebuilder;

        case 47:
          _context.next = 54;
          break;

        case 49:
          _context.prev = 49;
          _context.t3 = _context['catch'](44);

          rebuildSpinner.text = 'Rebuild Failed';
          rebuildSpinner.fail();
          throw _context.t3;

        case 54:
          rebuildSpinner.text = 'Rebuild Complete';
          rebuildSpinner.succeed();

        case 56:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined, [[3, 8], [44, 49]]);
}))();