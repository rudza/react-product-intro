"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(["\n  to {\n    box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);\n  }\n"], ["\n  to {\n    box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);\n  }\n"]),
    _templateObject2 = _taggedTemplateLiteral(["\n    padding: 0;\n    position: absolute;\n    width: 10px;\n    height: 10px;\n    border: none;\n    box-shadow: 0 0 0 0 rgba(232, 76, 61, 0.7);\n    border-radius: 50%;\n    background-color: #e84c3d;\n    animation: ", " 1.25s infinite cubic-bezier(0.66, 0, 0, 1);\n  "], ["\n    padding: 0;\n    position: absolute;\n    width: 10px;\n    height: 10px;\n    border: none;\n    box-shadow: 0 0 0 0 rgba(232, 76, 61, 0.7);\n    border-radius: 50%;\n    background-color: #e84c3d;\n    animation: ", " 1.25s infinite cubic-bezier(0.66, 0, 0, 1);\n  "]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var pulse = (0, _styledComponents.keyframes)(_templateObject);

exports.default = function (_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      position = _ref.position,
      width = _ref.width,
      height = _ref.height,
      margin = _ref.margin,
      size = _ref.size,
      arrowSize = _ref.arrowSize;

  switch (position) {
    case "left":
      style.left = width + size * 2;;
      style.top = "50%";
      style.transform = "translateY(-50%)";
      style.WebkitTransform = "translateY(-50%)";
      break;
    case "right":
      style.top = "50%";
      style.transform = "translateY(-50%)";
      style.WebkitTransform = "translateY(-50%)";
      style.left = 0 - margin - size / 2;
      break;
    case "top":
      style.top = height + margin + size;
      style.left = "50%";
      style.transform = "translateX(-50%)";
      style.WebkitTransform = "translateX(-50%)";
      break;
    case "topLeft":
      style.top = height + margin + size;
      style.left = width - size * 2;
      break;
    case "topRight":
      style.top = height + margin + size;
      style.left = 0 + size;
      break;
    case "bottom":
      style.top = 0 - margin - arrowSize - size / 2;
      style.left = "50%";
      style.transform = "translateX(-50%)";
      style.WebkitTransform = "translateX(-50%)";
      break;
    case "bottomLeft":
      style.top = 0 - margin - arrowSize - size / 2;
      style.left = width - size * 2;
      break;
    case "bottomRight":
      style.top = 0 - margin - arrowSize - size / 2;
      style.left = arrowSize - size / 2;
      break;
    default:
      style.display = "none";
      break;
  }

  var Beacon = _styledComponents2.default.div(_templateObject2, pulse);
  return _react2.default.createElement(Beacon, { style: style });
};