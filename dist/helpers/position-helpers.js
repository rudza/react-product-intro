"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var windowWidth = window.innerWidth;

var positions = {
	right: function right(_ref) {
		var position = _ref.position,
		    tourElHeight = _ref.tourElHeight,
		    margin = _ref.margin;

		return {
			left: Math.floor(position.right + margin),
			top: Math.floor(position.top + window.pageYOffset - (tourElHeight - position.height) / 2),
			positioned: "right"
		};
	},
	left: function left(_ref2) {
		var position = _ref2.position,
		    tourElWidth = _ref2.tourElWidth,
		    tourElHeight = _ref2.tourElHeight,
		    margin = _ref2.margin;

		return {
			left: Math.floor(position.left - margin - tourElWidth),
			top: Math.floor(position.top + window.pageYOffset - (tourElHeight - position.height) / 2),
			positioned: "left"
		};
	},
	top: function top(_ref3) {
		var position = _ref3.position,
		    tourElWidth = _ref3.tourElWidth,
		    tourElHeight = _ref3.tourElHeight,
		    arrowSize = _ref3.arrowSize,
		    margin = _ref3.margin;

		var pos = {
			left: Math.floor(position.left - (tourElWidth - position.width) / 2),
			top: Math.floor(position.top + window.pageYOffset - margin - tourElHeight - arrowSize),
			positioned: "top"
		};
		if (pos.left + tourElWidth > windowWidth) {
			pos.left = (windowWidth - tourElWidth) / 2;
		}
		return pos;
	},
	topLeft: function topLeft(_ref4) {
		var position = _ref4.position,
		    tourElWidth = _ref4.tourElWidth,
		    tourElHeight = _ref4.tourElHeight,
		    arrowSize = _ref4.arrowSize,
		    margin = _ref4.margin;

		return {
			left: Math.floor(position.left + margin - tourElWidth),
			top: Math.floor(position.top + window.pageYOffset - margin - tourElHeight - arrowSize),
			positioned: "topLeft"
		};
	},
	topRight: function topRight(_ref5) {
		var position = _ref5.position,
		    tourElHeight = _ref5.tourElHeight,
		    arrowSize = _ref5.arrowSize,
		    margin = _ref5.margin;

		return {
			left: Math.floor(position.right - arrowSize * 2),
			top: Math.floor(position.top + window.pageYOffset - margin - tourElHeight - arrowSize),
			positioned: "topRight"
		};
	},
	bottom: function bottom(_ref6) {
		var position = _ref6.position,
		    tourElWidth = _ref6.tourElWidth,
		    arrowSize = _ref6.arrowSize,
		    offsetHeight = _ref6.offsetHeight,
		    margin = _ref6.margin;

		return {
			left: Math.floor(position.left - (tourElWidth - position.width) / 2),
			top: Math.floor(position.top + window.pageYOffset + margin + offsetHeight + arrowSize),
			positioned: "bottom"
		};
	},
	bottomLeft: function bottomLeft(_ref7) {
		var position = _ref7.position,
		    tourElWidth = _ref7.tourElWidth,
		    arrowSize = _ref7.arrowSize,
		    offsetHeight = _ref7.offsetHeight,
		    margin = _ref7.margin;

		return {
			left: Math.floor(position.left + margin - tourElWidth),
			top: Math.floor(position.top + window.pageYOffset + margin + offsetHeight + arrowSize),
			positioned: "bottomLeft"
		};
	},
	bottomRight: function bottomRight(_ref8) {
		var position = _ref8.position,
		    arrowSize = _ref8.arrowSize,
		    offsetHeight = _ref8.offsetHeight,
		    margin = _ref8.margin;

		return {
			left: Math.floor(position.left + margin),
			top: Math.floor(position.top + window.pageYOffset + margin + offsetHeight + arrowSize),
			positioned: "bottomRight"
		};
	},
	ontop: function ontop(_ref9) {
		var position = _ref9.position,
		    tourElWidth = _ref9.tourElWidth,
		    arrowSize = _ref9.arrowSize,
		    offsetHeight = _ref9.offsetHeight,
		    margin = _ref9.margin;

		return {
			left: Math.floor(position.left + (position.width - tourElWidth) / 2),
			top: Math.floor(position.top + margin + window.pageYOffset),
			positioned: "ontop"
		};
	}
};

exports.default = positions;