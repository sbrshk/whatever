'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee(dir) {
    var safe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var packageData;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            packageData = void 0;
            _context.prev = 1;
            _context.next = 4;
            return _fsPromise2.default.readFile(_path2.default.resolve(dir, 'package.json'), 'utf8');

          case 4:
            packageData = _context.sent;
            _context.next = 14;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](1);

            if (!safe) {
              _context.next = 13;
              break;
            }

            packageData = '{}';
            _context.next = 14;
            break;

          case 13:
            throw _context.t0;

          case 14:
            return _context.abrupt('return', JSON.parse(packageData));

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 7]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();