'use strict';

exports.__esModule = true;

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _testcafeBrowserTools = require('testcafe-browser-tools');

var _getMaximizedHeadlessWindowSize = require('../../utils/get-maximized-headless-window-size');

var _getMaximizedHeadlessWindowSize2 = _interopRequireDefault(_getMaximizedHeadlessWindowSize);

var _crop = require('../../../../screenshots/crop');

var _promisifiedFunctions = require('../../../../utils/promisified-functions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    openedBrowsers: {},

    isMultiBrowser: false,

    _getConfig() {
        throw new Error('Not implemented');
    },

    _getBrowserProtocolClient() /* runtimeInfo */{
        throw new Error('Not implemented');
    },

    _getBrowserName() {
        return this.providerName.replace(':', '');
    },

    isValidBrowserName(browserName) {
        var _this = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const config = yield _this._getConfig(browserName);
            const browserInfo = yield (0, _testcafeBrowserTools.getBrowserInfo)(config.path || _this._getBrowserName());

            return !!browserInfo;
        })();
    },

    isLocalBrowser() {
        return (0, _asyncToGenerator3.default)(function* () {
            return true;
        })();
    },

    isHeadlessBrowser(browserId) {
        return this.openedBrowsers[browserId].config.headless;
    },

    _getCropDimensions(viewportWidth, viewportHeight) {
        if (!viewportWidth || !viewportHeight) return null;

        return {
            left: 0,
            top: 0,
            right: viewportWidth,
            bottom: viewportHeight
        };
    },

    takeScreenshot(browserId, path, viewportWidth, viewportHeight) {
        var _this2 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const runtimeInfo = _this2.openedBrowsers[browserId];
            const browserClient = _this2._getBrowserProtocolClient(runtimeInfo);
            const binaryImage = yield browserClient.getScreenshotData(runtimeInfo);
            const pngImage = yield (0, _promisifiedFunctions.readPng)(binaryImage);
            const cropDimensions = _this2._getCropDimensions(viewportWidth, viewportHeight);
            const croppedImage = yield (0, _crop.cropScreenshot)(pngImage, { path, cropDimensions });

            yield (0, _promisifiedFunctions.writePng)(path, croppedImage || pngImage);
        })();
    },

    maximizeWindow(browserId) {
        var _this3 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const maximumSize = (0, _getMaximizedHeadlessWindowSize2.default)();

            yield _this3.resizeWindow(browserId, maximumSize.width, maximumSize.height, maximumSize.width, maximumSize.height);
        })();
    }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9icm93c2VyL3Byb3ZpZGVyL2J1aWx0LWluL2RlZGljYXRlZC9iYXNlLmpzIl0sIm5hbWVzIjpbIm9wZW5lZEJyb3dzZXJzIiwiaXNNdWx0aUJyb3dzZXIiLCJfZ2V0Q29uZmlnIiwiRXJyb3IiLCJfZ2V0QnJvd3NlclByb3RvY29sQ2xpZW50IiwiX2dldEJyb3dzZXJOYW1lIiwicHJvdmlkZXJOYW1lIiwicmVwbGFjZSIsImlzVmFsaWRCcm93c2VyTmFtZSIsImJyb3dzZXJOYW1lIiwiY29uZmlnIiwiYnJvd3NlckluZm8iLCJwYXRoIiwiaXNMb2NhbEJyb3dzZXIiLCJpc0hlYWRsZXNzQnJvd3NlciIsImJyb3dzZXJJZCIsImhlYWRsZXNzIiwiX2dldENyb3BEaW1lbnNpb25zIiwidmlld3BvcnRXaWR0aCIsInZpZXdwb3J0SGVpZ2h0IiwibGVmdCIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwidGFrZVNjcmVlbnNob3QiLCJydW50aW1lSW5mbyIsImJyb3dzZXJDbGllbnQiLCJiaW5hcnlJbWFnZSIsImdldFNjcmVlbnNob3REYXRhIiwicG5nSW1hZ2UiLCJjcm9wRGltZW5zaW9ucyIsImNyb3BwZWRJbWFnZSIsIm1heGltaXplV2luZG93IiwibWF4aW11bVNpemUiLCJyZXNpemVXaW5kb3ciLCJ3aWR0aCIsImhlaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O2tCQUVlO0FBQ1hBLG9CQUFnQixFQURMOztBQUdYQyxvQkFBZ0IsS0FITDs7QUFLWEMsaUJBQWM7QUFDVixjQUFNLElBQUlDLEtBQUosQ0FBVSxpQkFBVixDQUFOO0FBQ0gsS0FQVTs7QUFTWEMsZ0NBQTJCLGlCQUFtQjtBQUMxQyxjQUFNLElBQUlELEtBQUosQ0FBVSxpQkFBVixDQUFOO0FBQ0gsS0FYVTs7QUFhWEUsc0JBQW1CO0FBQ2YsZUFBTyxLQUFLQyxZQUFMLENBQWtCQyxPQUFsQixDQUEwQixHQUExQixFQUErQixFQUEvQixDQUFQO0FBQ0gsS0FmVTs7QUFpQkxDLHNCQUFOLENBQTBCQyxXQUExQixFQUF1QztBQUFBOztBQUFBO0FBQ25DLGtCQUFNQyxTQUFjLE1BQU0sTUFBS1IsVUFBTCxDQUFnQk8sV0FBaEIsQ0FBMUI7QUFDQSxrQkFBTUUsY0FBYyxNQUFNLDBDQUFlRCxPQUFPRSxJQUFQLElBQWUsTUFBS1AsZUFBTCxFQUE5QixDQUExQjs7QUFFQSxtQkFBTyxDQUFDLENBQUNNLFdBQVQ7QUFKbUM7QUFLdEMsS0F0QlU7O0FBd0JMRSxrQkFBTixHQUF3QjtBQUFBO0FBQ3BCLG1CQUFPLElBQVA7QUFEb0I7QUFFdkIsS0ExQlU7O0FBNEJYQyxzQkFBbUJDLFNBQW5CLEVBQThCO0FBQzFCLGVBQU8sS0FBS2YsY0FBTCxDQUFvQmUsU0FBcEIsRUFBK0JMLE1BQS9CLENBQXNDTSxRQUE3QztBQUNILEtBOUJVOztBQWdDWEMsdUJBQW9CQyxhQUFwQixFQUFtQ0MsY0FBbkMsRUFBbUQ7QUFDL0MsWUFBSSxDQUFDRCxhQUFELElBQWtCLENBQUNDLGNBQXZCLEVBQ0ksT0FBTyxJQUFQOztBQUVKLGVBQU87QUFDSEMsa0JBQVEsQ0FETDtBQUVIQyxpQkFBUSxDQUZMO0FBR0hDLG1CQUFRSixhQUhMO0FBSUhLLG9CQUFRSjtBQUpMLFNBQVA7QUFNSCxLQTFDVTs7QUE0Q0xLLGtCQUFOLENBQXNCVCxTQUF0QixFQUFpQ0gsSUFBakMsRUFBdUNNLGFBQXZDLEVBQXNEQyxjQUF0RCxFQUFzRTtBQUFBOztBQUFBO0FBQ2xFLGtCQUFNTSxjQUFpQixPQUFLekIsY0FBTCxDQUFvQmUsU0FBcEIsQ0FBdkI7QUFDQSxrQkFBTVcsZ0JBQWlCLE9BQUt0Qix5QkFBTCxDQUErQnFCLFdBQS9CLENBQXZCO0FBQ0Esa0JBQU1FLGNBQWlCLE1BQU1ELGNBQWNFLGlCQUFkLENBQWdDSCxXQUFoQyxDQUE3QjtBQUNBLGtCQUFNSSxXQUFpQixNQUFNLG1DQUFRRixXQUFSLENBQTdCO0FBQ0Esa0JBQU1HLGlCQUFpQixPQUFLYixrQkFBTCxDQUF3QkMsYUFBeEIsRUFBdUNDLGNBQXZDLENBQXZCO0FBQ0Esa0JBQU1ZLGVBQWlCLE1BQU0sMEJBQWVGLFFBQWYsRUFBeUIsRUFBRWpCLElBQUYsRUFBUWtCLGNBQVIsRUFBekIsQ0FBN0I7O0FBRUEsa0JBQU0sb0NBQVNsQixJQUFULEVBQWVtQixnQkFBZ0JGLFFBQS9CLENBQU47QUFSa0U7QUFTckUsS0FyRFU7O0FBdURMRyxrQkFBTixDQUFzQmpCLFNBQXRCLEVBQWlDO0FBQUE7O0FBQUE7QUFDN0Isa0JBQU1rQixjQUFjLCtDQUFwQjs7QUFFQSxrQkFBTSxPQUFLQyxZQUFMLENBQWtCbkIsU0FBbEIsRUFBNkJrQixZQUFZRSxLQUF6QyxFQUFnREYsWUFBWUcsTUFBNUQsRUFBb0VILFlBQVlFLEtBQWhGLEVBQXVGRixZQUFZRyxNQUFuRyxDQUFOO0FBSDZCO0FBSWhDO0FBM0RVLEMiLCJmaWxlIjoiYnJvd3Nlci9wcm92aWRlci9idWlsdC1pbi9kZWRpY2F0ZWQvYmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldEJyb3dzZXJJbmZvIH0gZnJvbSAndGVzdGNhZmUtYnJvd3Nlci10b29scyc7XG5pbXBvcnQgZ2V0TWF4aW1pemVkSGVhZGxlc3NXaW5kb3dTaXplIGZyb20gJy4uLy4uL3V0aWxzL2dldC1tYXhpbWl6ZWQtaGVhZGxlc3Mtd2luZG93LXNpemUnO1xuaW1wb3J0IHsgY3JvcFNjcmVlbnNob3QgfSBmcm9tICcuLi8uLi8uLi8uLi9zY3JlZW5zaG90cy9jcm9wJztcbmltcG9ydCB7IHJlYWRQbmcsIHdyaXRlUG5nIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvcHJvbWlzaWZpZWQtZnVuY3Rpb25zJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIG9wZW5lZEJyb3dzZXJzOiB7fSxcblxuICAgIGlzTXVsdGlCcm93c2VyOiBmYWxzZSxcblxuICAgIF9nZXRDb25maWcgKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICAgIH0sXG5cbiAgICBfZ2V0QnJvd3NlclByb3RvY29sQ2xpZW50ICgvKiBydW50aW1lSW5mbyAqLykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICAgIH0sXG5cbiAgICBfZ2V0QnJvd3Nlck5hbWUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm92aWRlck5hbWUucmVwbGFjZSgnOicsICcnKTtcbiAgICB9LFxuXG4gICAgYXN5bmMgaXNWYWxpZEJyb3dzZXJOYW1lIChicm93c2VyTmFtZSkge1xuICAgICAgICBjb25zdCBjb25maWcgICAgICA9IGF3YWl0IHRoaXMuX2dldENvbmZpZyhicm93c2VyTmFtZSk7XG4gICAgICAgIGNvbnN0IGJyb3dzZXJJbmZvID0gYXdhaXQgZ2V0QnJvd3NlckluZm8oY29uZmlnLnBhdGggfHwgdGhpcy5fZ2V0QnJvd3Nlck5hbWUoKSk7XG5cbiAgICAgICAgcmV0dXJuICEhYnJvd3NlckluZm87XG4gICAgfSxcblxuICAgIGFzeW5jIGlzTG9jYWxCcm93c2VyICgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIGlzSGVhZGxlc3NCcm93c2VyIChicm93c2VySWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3BlbmVkQnJvd3NlcnNbYnJvd3NlcklkXS5jb25maWcuaGVhZGxlc3M7XG4gICAgfSxcblxuICAgIF9nZXRDcm9wRGltZW5zaW9ucyAodmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQpIHtcbiAgICAgICAgaWYgKCF2aWV3cG9ydFdpZHRoIHx8ICF2aWV3cG9ydEhlaWdodClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsZWZ0OiAgIDAsXG4gICAgICAgICAgICB0b3A6ICAgIDAsXG4gICAgICAgICAgICByaWdodDogIHZpZXdwb3J0V2lkdGgsXG4gICAgICAgICAgICBib3R0b206IHZpZXdwb3J0SGVpZ2h0XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGFzeW5jIHRha2VTY3JlZW5zaG90IChicm93c2VySWQsIHBhdGgsIHZpZXdwb3J0V2lkdGgsIHZpZXdwb3J0SGVpZ2h0KSB7XG4gICAgICAgIGNvbnN0IHJ1bnRpbWVJbmZvICAgID0gdGhpcy5vcGVuZWRCcm93c2Vyc1ticm93c2VySWRdO1xuICAgICAgICBjb25zdCBicm93c2VyQ2xpZW50ICA9IHRoaXMuX2dldEJyb3dzZXJQcm90b2NvbENsaWVudChydW50aW1lSW5mbyk7XG4gICAgICAgIGNvbnN0IGJpbmFyeUltYWdlICAgID0gYXdhaXQgYnJvd3NlckNsaWVudC5nZXRTY3JlZW5zaG90RGF0YShydW50aW1lSW5mbyk7XG4gICAgICAgIGNvbnN0IHBuZ0ltYWdlICAgICAgID0gYXdhaXQgcmVhZFBuZyhiaW5hcnlJbWFnZSk7XG4gICAgICAgIGNvbnN0IGNyb3BEaW1lbnNpb25zID0gdGhpcy5fZ2V0Q3JvcERpbWVuc2lvbnModmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQpO1xuICAgICAgICBjb25zdCBjcm9wcGVkSW1hZ2UgICA9IGF3YWl0IGNyb3BTY3JlZW5zaG90KHBuZ0ltYWdlLCB7IHBhdGgsIGNyb3BEaW1lbnNpb25zIH0pO1xuXG4gICAgICAgIGF3YWl0IHdyaXRlUG5nKHBhdGgsIGNyb3BwZWRJbWFnZSB8fCBwbmdJbWFnZSk7XG4gICAgfSxcblxuICAgIGFzeW5jIG1heGltaXplV2luZG93IChicm93c2VySWQpIHtcbiAgICAgICAgY29uc3QgbWF4aW11bVNpemUgPSBnZXRNYXhpbWl6ZWRIZWFkbGVzc1dpbmRvd1NpemUoKTtcblxuICAgICAgICBhd2FpdCB0aGlzLnJlc2l6ZVdpbmRvdyhicm93c2VySWQsIG1heGltdW1TaXplLndpZHRoLCBtYXhpbXVtU2l6ZS5oZWlnaHQsIG1heGltdW1TaXplLndpZHRoLCBtYXhpbXVtU2l6ZS5oZWlnaHQpO1xuICAgIH1cbn07XG4iXX0=
