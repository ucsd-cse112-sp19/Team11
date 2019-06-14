'use strict';

exports.__esModule = true;

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _endpointUtils = require('endpoint-utils');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _createTempProfile = require('./create-temp-profile');

var _createTempProfile2 = _interopRequireDefault(_createTempProfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (() => {
    var _ref = (0, _asyncToGenerator3.default)(function* (configString) {
        const config = (0, _config2.default)(configString);
        const marionettePort = config.marionettePort || (!config.userProfile ? yield (0, _endpointUtils.getFreePort)() : null);
        const runtimeInfo = { config, marionettePort };

        runtimeInfo.tempProfileDir = !config.userProfile ? yield (0, _createTempProfile2.default)(runtimeInfo) : null;

        return runtimeInfo;
    });

    return function (_x) {
        return _ref.apply(this, arguments);
    };
})();

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9icm93c2VyL3Byb3ZpZGVyL2J1aWx0LWluL2RlZGljYXRlZC9maXJlZm94L3J1bnRpbWUtaW5mby5qcyJdLCJuYW1lcyI6WyJjb25maWdTdHJpbmciLCJjb25maWciLCJtYXJpb25ldHRlUG9ydCIsInVzZXJQcm9maWxlIiwicnVudGltZUluZm8iLCJ0ZW1wUHJvZmlsZURpciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7Ozs7OytDQUdlLFdBQWdCQSxZQUFoQixFQUE4QjtBQUN6QyxjQUFNQyxTQUFpQixzQkFBVUQsWUFBVixDQUF2QjtBQUNBLGNBQU1FLGlCQUFpQkQsT0FBT0MsY0FBUCxLQUEwQixDQUFDRCxPQUFPRSxXQUFSLEdBQXNCLE1BQU0saUNBQTVCLEdBQTRDLElBQXRFLENBQXZCO0FBQ0EsY0FBTUMsY0FBaUIsRUFBRUgsTUFBRixFQUFVQyxjQUFWLEVBQXZCOztBQUVBRSxvQkFBWUMsY0FBWixHQUE2QixDQUFDSixPQUFPRSxXQUFSLEdBQXNCLE1BQU0saUNBQWtCQyxXQUFsQixDQUE1QixHQUE2RCxJQUExRjs7QUFFQSxlQUFPQSxXQUFQO0FBQ0gsSyIsImZpbGUiOiJicm93c2VyL3Byb3ZpZGVyL2J1aWx0LWluL2RlZGljYXRlZC9maXJlZm94L3J1bnRpbWUtaW5mby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldEZyZWVQb3J0IH0gZnJvbSAnZW5kcG9pbnQtdXRpbHMnO1xuaW1wb3J0IGdldENvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgY3JlYXRlVGVtcFByb2ZpbGUgZnJvbSAnLi9jcmVhdGUtdGVtcC1wcm9maWxlJztcblxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiAoY29uZmlnU3RyaW5nKSB7XG4gICAgY29uc3QgY29uZmlnICAgICAgICAgPSBnZXRDb25maWcoY29uZmlnU3RyaW5nKTtcbiAgICBjb25zdCBtYXJpb25ldHRlUG9ydCA9IGNvbmZpZy5tYXJpb25ldHRlUG9ydCB8fCAoIWNvbmZpZy51c2VyUHJvZmlsZSA/IGF3YWl0IGdldEZyZWVQb3J0KCkgOiBudWxsKTtcbiAgICBjb25zdCBydW50aW1lSW5mbyAgICA9IHsgY29uZmlnLCBtYXJpb25ldHRlUG9ydCB9O1xuXG4gICAgcnVudGltZUluZm8udGVtcFByb2ZpbGVEaXIgPSAhY29uZmlnLnVzZXJQcm9maWxlID8gYXdhaXQgY3JlYXRlVGVtcFByb2ZpbGUocnVudGltZUluZm8pIDogbnVsbDtcblxuICAgIHJldHVybiBydW50aW1lSW5mbztcbn1cbiJdfQ==
