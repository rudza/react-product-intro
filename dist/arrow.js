"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _arrowStyles = require("./helpers/arrow-styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Arrow = function Arrow(_ref) {
	var position = _ref.position,
	    width = _ref.width,
	    height = _ref.height,
	    size = _ref.size,
	    color = _ref.color;

	var arrowStyle = void 0;
	switch (position) {
		case "left":
			arrowStyle = (0, _arrowStyles.arrowRight)({ size: size, color: color });
			arrowStyle.left = width;
			arrowStyle.top = "50%";
			arrowStyle.transform = "translateY(-50%)";
			arrowStyle.WebkitTransform = "translateY(-50%)";
			break;
		case "right":
			arrowStyle = (0, _arrowStyles.arrowLeft)({ size: size, color: color });
			arrowStyle.top = "50%";
			arrowStyle.transform = "translateY(-50%)";
			arrowStyle.WebkitTransform = "translateY(-50%)";
			break;
		case "top":
			arrowStyle = (0, _arrowStyles.arrowDown)({ size: size, color: color });
			arrowStyle.top = height;
			arrowStyle.left = "50%";
			arrowStyle.transform = "translateX(-50%)";
			arrowStyle.WebkitTransform = "translateX(-50%)";
			break;
		case "topLeft":
			arrowStyle = (0, _arrowStyles.arrowDown)({ size: size, color: color });
			arrowStyle.top = height;
			arrowStyle.left = width - size * 2;
			break;
		case "topRight":
			arrowStyle = (0, _arrowStyles.arrowDown)({ size: size, color: color });
			arrowStyle.top = height;
			arrowStyle.left = 0;
			break;
		case "bottom":
			arrowStyle = (0, _arrowStyles.arrowUp)({ size: size, color: color });
			arrowStyle.left = "50%";
			arrowStyle.transform = "translateX(-50%)";
			arrowStyle.WebkitTransform = "translateX(-50%)";
			break;
		case "bottomLeft":
			arrowStyle = (0, _arrowStyles.arrowUp)({ size: size, color: color });
			arrowStyle.left = width - size * 2;
			break;
		case "bottomRight":
			arrowStyle = (0, _arrowStyles.arrowUp)({ size: size, color: color });
			arrowStyle.left = 0;
			break;
		default:
			arrowStyle = {};
	}
	return _react2.default.createElement("div", { className: "react-user-tour-arrow", style: arrowStyle });
};

exports.default = Arrow;