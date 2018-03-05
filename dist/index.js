"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require("react-motion");

var _tourButton = require("./tour-button");

var _tourButton2 = _interopRequireDefault(_tourButton);

var _tourButtonContainer = require("./tour-button-container");

var _tourButtonContainer2 = _interopRequireDefault(_tourButtonContainer);

var _arrow = require("./arrow");

var _arrow2 = _interopRequireDefault(_arrow);

var _Beacon = require("./Beacon");

var _Beacon2 = _interopRequireDefault(_Beacon);

var _positionHelpers = require("./helpers/position-helpers");

var _positionHelpers2 = _interopRequireDefault(_positionHelpers);

var _viewboxHelpers = require("./helpers/viewbox-helpers");

var viewBoxHelpers = _interopRequireWildcard(_viewboxHelpers);

var _scrollToPosition = require("./helpers/scroll-to-position");

var _scrollToPosition2 = _interopRequireDefault(_scrollToPosition);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultMargin = 25;
var defaultPadding = 15;

var ReactUserTour = function (_Component) {
  _inherits(ReactUserTour, _Component);

  function ReactUserTour(props) {
    _classCallCheck(this, ReactUserTour);

    var _this = _possibleConstructorReturn(this, (ReactUserTour.__proto__ || Object.getPrototypeOf(ReactUserTour)).call(this, props));

    _this.prevPos = {
      top: 0,
      left: 0
    };
    _this.getStepPosition = _this.getStepPosition.bind(_this);

    _this.width = _this.props.width;
    _this.height = _this.props.height;

    if (_this.width > window.innerWidth || window.innerWidth - _this.width < 2 * defaultPadding) {
      _this.width = window.innerWidth - defaultPadding * 2; // Set padding on smaller screens
    }
    return _this;
  }

  _createClass(ReactUserTour, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return this.props.step !== nextProps.step || this.props.active !== nextProps.active || this.props.hideButtons !== nextProps.hideButtons || this.props.hideClose !== nextProps.hideClose;
    }
  }, {
    key: "getMaskPositionAndDimensions",
    value: function getMaskPositionAndDimensions(_ref) {
      var selector = _ref.selector;

      var el = document.querySelector(selector);
      if (el) {
        var position = el ? el.getBoundingClientRect() : {};
        return position;
      }
    }
  }, {
    key: "getMaskStyle",
    value: function getMaskStyle(_ref2) {
      var selector = _ref2.selector;

      var el = document.querySelector(selector);
      if (el) {
        var elementStyle = el ? window.getComputedStyle(el) : null;
        return {
          boxShadow: "0px 0px 0px " + Math.max(document.body.clientWidth, document.body.clientHeight) * 2 + "px #222326",
          opacity: 0.5,
          borderRadius: elementStyle ? elementStyle.getPropertyValue('border-radius') : 0
        };
      }
    }
  }, {
    key: "getStepPosition",
    value: function getStepPosition(_ref3) {
      var selector = _ref3.selector,
          tourElWidth = _ref3.tourElWidth,
          tourElHeight = _ref3.tourElHeight,
          overridePos = _ref3.overridePos,
          margin = _ref3.margin,
          _ref3$horizontalOffse = _ref3.horizontalOffset,
          horizontalOffset = _ref3$horizontalOffse === undefined ? 0 : _ref3$horizontalOffse,
          _ref3$verticalOffset = _ref3.verticalOffset,
          verticalOffset = _ref3$verticalOffset === undefined ? 0 : _ref3$verticalOffset;

      var windowHeight = window.innerHeight;
      var windowWidth = window.innerWidth;
      var el = document.querySelector(selector);
      if (el) {
        var elPosition = el ? el.getBoundingClientRect() : {};

        var isElementBelowViewBox = viewBoxHelpers.isElementBelowViewBox(windowHeight, elPosition.top);
        var isElementAboveViewBox = viewBoxHelpers.isElementAboveViewBox(elPosition.bottom);

        if (isElementBelowViewBox) {
          elPosition = (0, _scrollToPosition2.default)(el, elPosition.bottom);
        } else if (isElementAboveViewBox) {
          elPosition = (0, _scrollToPosition2.default)(el, window.pageYOffset + elPosition.top);
        }

        var elPos = void 0;

        // console.log('overridePos', overridePos)

        if (overridePos && _positionHelpers2.default[overridePos]) {
          elPos = _positionHelpers2.default[overridePos]({
            position: elPosition,
            tourElWidth: tourElWidth,
            tourElHeight: tourElHeight,
            arrowSize: this.props.arrowSize,
            offsetHeight: el.offsetHeight,
            margin: margin
          });
        } else {
          var shouldPositionLeft = viewBoxHelpers.shouldPositionLeft({
            viewBoxWidth: windowWidth,
            left: elPosition.left,
            tooltipWidth: tourElWidth
          });
          var shouldPositionRight = viewBoxHelpers.shouldPositionRight({
            viewBoxWidth: windowWidth,
            right: elPosition.right,
            left: elPosition.left,
            tooltipWidth: tourElWidth
          });

          // Position above on mobile and tablets
          var shouldPositionAbove =
          // windowWidth < 991 ||
          viewBoxHelpers.shouldPositionAbove({
            viewBoxHeight: windowHeight,
            top: elPosition.top,
            bottom: elPosition.bottom,
            tooltipHeight: tourElHeight
          });

          var shouldPositionBelow = viewBoxHelpers.shouldPositionBelow({
            viewBoxWidth: windowWidth,
            viewBoxHeight: windowHeight,
            top: elPosition.top,
            right: elPosition.right,
            bottom: elPosition.bottom,
            tooltipWidth: tourElWidth,
            tooltipHeight: tourElHeight
          });

          if (shouldPositionLeft && !shouldPositionAbove && !shouldPositionBelow) {
            elPos = _positionHelpers2.default.left({
              position: elPosition,
              tourElWidth: tourElWidth,
              tourElHeight: tourElHeight,
              margin: margin
            });
          } else if (shouldPositionRight && !shouldPositionAbove && !shouldPositionBelow) {
            elPos = _positionHelpers2.default.right({
              position: elPosition,
              tourElHeight: tourElHeight,
              margin: margin
            });
          } else if (shouldPositionAbove) {
            elPos = shouldPositionLeft ? _positionHelpers2.default.topLeft({
              position: elPosition,
              tourElWidth: tourElWidth,
              tourElHeight: tourElHeight,
              arrowSize: this.props.arrowSize,
              margin: margin
            }) : shouldPositionRight ? _positionHelpers2.default.topRight({
              position: elPosition,
              tourElHeight: tourElHeight,
              arrowSize: this.props.arrowSize,
              margin: margin
            }) : _positionHelpers2.default.top({
              position: elPosition,
              tourElWidth: tourElWidth,
              tourElHeight: tourElHeight,
              arrowSize: this.props.arrowSize,
              margin: margin
            });
          } else if (shouldPositionBelow) {
            elPos = shouldPositionLeft ? _positionHelpers2.default.bottomLeft({
              position: elPosition,
              tourElWidth: tourElWidth,
              arrowSize: this.props.arrowSize,
              offsetHeight: el.offsetHeight,
              margin: margin
            }) : shouldPositionRight ? _positionHelpers2.default.bottomRight({
              position: elPosition,
              tourElWidth: tourElWidth,
              arrowSize: this.props.arrowSize,
              offsetHeight: el.offsetHeight,
              margin: margin
            }) : _positionHelpers2.default.bottom({
              position: elPosition,
              tourElWidth: tourElWidth,
              arrowSize: this.props.arrowSize,
              offsetHeight: el.offsetHeight,
              margin: margin
            });
          } else {
            elPos = _positionHelpers2.default.ontop({
              position: elPosition,
              tourElWidth: tourElWidth,
              arrowSize: this.props.arrowSize,
              offsetHeight: el.offsetHeight,
              margin: margin
            });
          }
        }

        elPos.left += horizontalOffset;
        elPos.top += verticalOffset;

        this.prevPos = elPos;
        return elPos;
      } else {
        return this.prevPos;
      }
    }
  }, {
    key: "getCustomArrow",
    value: function getCustomArrow(position) {
      return typeof this.props.arrow === "function" ? this.props.arrow({
        position: position.positioned,
        width: this.width,
        height: this.height,
        size: this.props.arrowSize,
        color: this.props.arrowColor
      }) : this.props.arrow;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var currentTourStep = this.props.steps.filter(function (step) {
        return step.step === _this2.props.step;
      })[0];
      if (!this.props.active || !currentTourStep) {
        return null;
      }

      if (currentTourStep.before && typeof currentTourStep.before === "function") {
        currentTourStep.before();
      }

      var stepPosition = this.getStepPosition({
        selector: currentTourStep.selector,
        tourElWidth: this.width,
        tourElHeight: this.height,
        overridePos: currentTourStep.position,
        margin: currentTourStep.margin || defaultMargin,
        horizontalOffset: currentTourStep.horizontalOffset,
        verticalOffset: currentTourStep.verticalOffset
      });

      var beacon = !this.props.hideBeacon ? _react2.default.createElement(_Beacon2.default, {
        style: this.props.beaconStyle,
        position: stepPosition.positioned,
        width: this.width,
        height: this.height,
        margin: currentTourStep.margin || defaultMargin,
        size: 10,
        arrowSize: this.props.arrowSize
      }) : null;

      var arrow = this.props.arrow ? this.getCustomArrow(stepPosition) : _react2.default.createElement(_arrow2.default, {
        position: stepPosition.positioned,
        width: this.width,
        height: this.height,
        size: this.props.arrowSize,
        color: this.props.arrowColor
      });

      var extraButtonProps = this.props.buttonStyle ? { style: this.props.buttonStyle } : {};

      var backButton = this.props.step !== 1 ? _react2.default.createElement(
        _tourButton2.default,
        _extends({
          style: this.props.backButtonStyle,
          onClick: function onClick() {
            return _this2.props.onBack(_this2.props.step - 1);
          }
        }, extraButtonProps, {
          className: "react-user-tour-back-button" }),
        this.props.backButtonText
      ) : "";

      var nextButton = this.props.step !== this.props.steps.length ? _react2.default.createElement(
        _tourButton2.default,
        _extends({
          style: this.props.nextButtonStyle,
          onClick: function onClick() {
            return _this2.props.onNext(_this2.props.step + 1);
          }
        }, extraButtonProps, {
          className: "react-user-tour-next-button" }),
        this.props.nextButtonText
      ) : "";

      var doneButton = this.props.step === this.props.steps.length ? _react2.default.createElement(
        _tourButton2.default,
        _extends({
          style: this.props.doneButtonStyle,
          onClick: this.props.onCancel
        }, extraButtonProps, {
          className: "react-user-tour-done-button" }),
        this.props.doneButtonText
      ) : "";

      var tourStepsCounter = !this.props.hideSteps ? _react2.default.createElement(
        "div",
        { style: _extends({ position: "absolute", left: 20, bottom: 10 }, this.props.tourStepsCounterStyle) },
        this.props.step + " of " + this.props.steps.length
      ) : "";

      var tourButtonContainer = !this.props.hideButtons ? _react2.default.createElement(
        _tourButtonContainer2.default,
        { style: this.props.buttonContainerStyle },
        nextButton,
        doneButton,
        backButton
      ) : "";

      var closeButton = !this.props.hideClose ? this.props.closeButton ? _react2.default.createElement(
        "span",
        { className: "react-user-tour-close",
          style: { float: "right", cursor: "pointer", width: 20, height: 20, textAlign: "center" },
          onClick: this.props.onCancel },
        this.props.closeButton
      ) : _react2.default.createElement(
        "span",
        { className: "react-user-tour-close",
          style: { float: "right", cursor: "pointer" },
          onClick: this.props.onCancel },
        this.props.closeButtonText
      ) : "";

      var tourContainerStyle = _extends({
        pointerEvents: "none",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 100
      }, this.props.containerStyle);

      var tooltipStyle = _extends({}, this.props.style, { width: this.width, height: this.height, pointerEvents: "auto" });

      var maskPosition = this.getMaskPositionAndDimensions({ selector: currentTourStep.selector });
      var maskStyle = maskPosition ? Object.assign({
        position: "absolute",
        left: maskPosition.left,
        top: maskPosition.top + window.pageYOffset,
        width: maskPosition.width,
        height: maskPosition.height
      }, this.getMaskStyle({ selector: currentTourStep.selector })) : {};

      return _react2.default.createElement(
        "div",
        { className: "react-user-tour-container", style: tourContainerStyle },
        _react2.default.createElement(
          _reactMotion.Motion,
          { style: { x: (0, _reactMotion.spring)(stepPosition.left), y: (0, _reactMotion.spring)(stepPosition.top) } },
          function (_ref4) {
            var x = _ref4.x,
                y = _ref4.y;
            return _react2.default.createElement(
              "div",
              { style: _extends({}, tooltipStyle, { transform: "translate3d(" + x + "px, " + y + "px, 0)", WebkitTransform: "translate3d(" + x + "px, " + y + "px, 0)" }) },
              beacon,
              arrow,
              closeButton,
              currentTourStep.title,
              currentTourStep.body,
              tourStepsCounter,
              tourButtonContainer
            );
          }
        ),
        _react2.default.createElement("div", { style: maskStyle })
      );
    }
  }]);

  return ReactUserTour;
}(_react.Component);

exports.default = ReactUserTour;


ReactUserTour.defaultProps = {
  width: 350,
  height: 150,
  style: {
    padding: "13px 10px 10px 20px",
    position: "absolute",
    zIndex: 9999,
    backgroundColor: "#FFFFFF",
    color: "#222326",
    boxShadow: "0 6px 8px 0 rgba(0, 0, 0, 0.24)"
  },
  containerStyle: {},
  onCancel: function onCancel() {},
  onNext: function onNext() {},
  onBack: function onBack() {},
  nextButtonText: "Next",
  backButtonText: "Back",
  doneButtonText: "Done",
  closeButtonText: "Close",
  buttonContainerStyle: {
    position: "absolute",
    bottom: 10,
    right: 10
  },
  hideButtons: false,
  hideClose: false,
  arrowColor: "#fff",
  arrowSize: 15
};