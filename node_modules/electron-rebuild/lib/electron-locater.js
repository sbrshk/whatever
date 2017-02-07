'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locateElectronPrebuilt = locateElectronPrebuilt;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var possibleModuleNames = ['electron', 'electron-prebuilt', 'electron-prebuilt-compile'];

function locateElectronPrebuilt() {
  var electronPath = void 0;

  // Attempt to locate modules by path
  var foundModule = possibleModuleNames.some(function (moduleName) {
    electronPath = _path2.default.join(__dirname, '..', '..', moduleName);
    return _fs2.default.existsSync(electronPath);
  });

  // Return a path if we found one
  if (foundModule) return electronPath;

  // Attempt to locate modules by require
  foundModule = possibleModuleNames.some(function (moduleName) {
    try {
      electronPath = _path2.default.join(require.resolve(moduleName), '..');
    } catch (e) {
      return false;
    }
    return _fs2.default.existsSync(electronPath);
  });

  // Return a path if we found one
  if (foundModule) return electronPath;
  return null;
}