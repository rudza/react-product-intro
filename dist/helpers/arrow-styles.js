"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var defaultArrow = {
	width: "0px",
	height: "0px",
	position: "absolute"
};

var arrowUp = exports.arrowUp = function arrowUp(_ref) {
	var color = _ref.color,
	    size = _ref.size;
	return Object.assign({}, defaultArrow, {
		borderLeft: size + "px solid transparent",
		borderRight: size + "px solid transparent",
		borderBottom: size + "px solid " + color,
		top: "-" + size + "px"
	});
};

var arrowDown = exports.arrowDown = function arrowDown(_ref2) {
	var color = _ref2.color,
	    size = _ref2.size;
	return Object.assign({}, defaultArrow, {
		borderLeft: size + "px solid transparent",
		borderRight: size + "px solid transparent",
		borderTop: size + "px solid " + color
	});
};

var arrowRight = exports.arrowRight = function arrowRight(_ref3) {
	var color = _ref3.color,
	    size = _ref3.size;
	return Object.assign({}, defaultArrow, {
		borderTop: size + "px solid transparent",
		borderBottom: size + "px solid transparent",
		borderLeft: size + "px solid " + color
	});
};

var arrowLeft = exports.arrowLeft = function arrowLeft(_ref4) {
	var color = _ref4.color,
	    size = _ref4.size;
	return Object.assign({}, defaultArrow, {
		borderTop: size + "px solid transparent",
		borderBottom: size + "px solid transparent",
		borderRight: size + "px solid " + color,
		left: "-" + size + "px"
	});
};