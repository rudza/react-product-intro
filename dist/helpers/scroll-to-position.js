"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scrollToPosition;

var _scrollTo = require("scroll-to");

var _scrollTo2 = _interopRequireDefault(_scrollTo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scrollToPosition(el, position) {
  (0, _scrollTo2.default)(0, position, {
    ease: "out-sine",
    duration: 500
  });
  return el.getBoundingClientRect();
}