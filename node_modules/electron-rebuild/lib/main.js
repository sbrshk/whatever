'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preGypFixRun = exports.shouldRebuildNativeModules = exports.installNodeHeaders = exports.rebuildNativeModules = exports.default = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _rebuild = require('./rebuild');

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_rebuild).default;
  }
});
Object.defineProperty(exports, 'rebuildNativeModules', {
  enumerable: true,
  get: function get() {
    return _rebuild.rebuildNativeModules;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var installNodeHeaders = exports.installNodeHeaders = function installNodeHeaders() {
  return _promise2.default.resolve();
};
var shouldRebuildNativeModules = exports.shouldRebuildNativeModules = function shouldRebuildNativeModules() {
  return _promise2.default.resolve(true);
};
var preGypFixRun = exports.preGypFixRun = function preGypFixRun() {
  return _promise2.default.resolve();
};