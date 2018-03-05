"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isElementBelowViewBox = exports.isElementBelowViewBox = function isElementBelowViewBox(viewBoxHeight, top) {
  return viewBoxHeight - top < 0;
};
var isElementAboveViewBox = exports.isElementAboveViewBox = function isElementAboveViewBox(bottom) {
  return bottom < 0;
};

var shouldPositionLeft = exports.shouldPositionLeft = function shouldPositionLeft(_ref) {
  var viewBoxWidth = _ref.viewBoxWidth,
      left = _ref.left,
      tooltipWidth = _ref.tooltipWidth;

  return viewBoxWidth - left < viewBoxWidth / 2 && left > tooltipWidth || left > tooltipWidth;
};

var shouldPositionRight = exports.shouldPositionRight = function shouldPositionRight(_ref2) {
  var viewBoxWidth = _ref2.viewBoxWidth,
      right = _ref2.right,
      left = _ref2.left,
      tooltipWidth = _ref2.tooltipWidth;

  return left + tooltipWidth < viewBoxWidth / 2 && viewBoxWidth - right > tooltipWidth || viewBoxWidth - right > tooltipWidth;
};

var shouldPositionAbove = exports.shouldPositionAbove = function shouldPositionAbove(_ref3) {
  var viewBoxHeight = _ref3.viewBoxHeight,
      top = _ref3.top,
      bottom = _ref3.bottom,
      tooltipHeight = _ref3.tooltipHeight;

  return viewBoxHeight - bottom < tooltipHeight && top > tooltipHeight;
};

var shouldPositionBelow = exports.shouldPositionBelow = function shouldPositionBelow(_ref4) {
  var viewBoxHeight = _ref4.viewBoxHeight,
      top = _ref4.top,
      bottom = _ref4.bottom,
      tooltipHeight = _ref4.tooltipHeight;

  return top < tooltipHeight && viewBoxHeight - bottom > tooltipHeight || viewBoxHeight - bottom > tooltipHeight;
};