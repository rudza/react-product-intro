"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TourButton = function TourButton(props) {
  var _extends2;

  var style = _extends((_extends2 = {
    width: 86,
    height: 30,
    backgroundColor: "#cbd1d4",
    color: "#494949",
    fontWeight: "bold",
    display: "inline-block",
    textAlign: "center",
    cursor: "pointer",
    float: "right",
    fontSize: 14
  }, _defineProperty(_extends2, "fontWeight", "bold"), _defineProperty(_extends2, "lineHeight", "30px"), _extends2), props.style);

  return _react2.default.createElement(
    "div",
    { style: style, onClick: props.onClick, className: props.className },
    props.children
  );
};

TourButton.defaultProps = {
  onClick: function onClick() {}
};

exports.default = TourButton;