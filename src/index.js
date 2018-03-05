import React, { Component } from "react";
import { Motion, spring } from "react-motion";

import TourButton from "./tour-button";
import TourButtonContainer from "./tour-button-container";
import Arrow from "./arrow";
import Beacon from "./Beacon";
import positions from "./helpers/position-helpers";
import * as viewBoxHelpers from "./helpers/viewbox-helpers";
import scrollToPosition from "./helpers/scroll-to-position";

const defaultMargin = 25
const defaultPadding = 15

export default class ReactUserTour extends Component {
  constructor(props) {
    super(props);
    this.prevPos = {
      top: 0,
      left: 0
    };
    this.getStepPosition = this.getStepPosition.bind(this);

    this.width = this.props.width
    this.height = this.props.height

    if (this.width > window.innerWidth || window.innerWidth - this.width < 2*defaultPadding) {
      this.width = window.innerWidth - (defaultPadding*2) // Set padding on smaller screens
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.step !== nextProps.step ||
      this.props.active !== nextProps.active ||
      this.props.hideButtons !== nextProps.hideButtons ||
      this.props.hideClose !== nextProps.hideClose;
  }

  getMaskPositionAndDimensions({ selector }) {
    const el = document.querySelector(selector);
    if (el) {
      const position = el ? el.getBoundingClientRect() : {};
      return position
    }
  }

  getMaskStyle({ selector }) {
    const el = document.querySelector(selector);
    if (el) {
      const elementStyle = el ? window.getComputedStyle(el) : null;
      return {
        boxShadow: "0px 0px 0px " + (Math.max(document.body.clientWidth, document.body.clientHeight) * 2) + "px #222326",
        opacity: 0.5,
        borderRadius: elementStyle ? elementStyle.getPropertyValue('border-radius') : 0
      }
    }
  }

  getStepPosition({
    selector,
    tourElWidth,
    tourElHeight,
    overridePos,
    margin,
    horizontalOffset = 0,
    verticalOffset = 0
  }) {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const el = document.querySelector(selector);
    if (el) {
      let elPosition = el ? el.getBoundingClientRect() : {};

      const isElementBelowViewBox = viewBoxHelpers.isElementBelowViewBox(windowHeight, elPosition.top);
      const isElementAboveViewBox = viewBoxHelpers.isElementAboveViewBox(elPosition.bottom);

      if (isElementBelowViewBox) {
        elPosition = scrollToPosition(el, elPosition.bottom);
      }
      else if (isElementAboveViewBox) {
        elPosition = scrollToPosition(el, window.pageYOffset + elPosition.top);
      }

      let elPos;

      // console.log('overridePos', overridePos)

      if (overridePos && positions[overridePos]) {
        elPos = positions[overridePos]({
          position: elPosition,
          tourElWidth,
          tourElHeight,
          arrowSize: this.props.arrowSize,
          offsetHeight: el.offsetHeight,
          margin
        });
      }
      else {
        const shouldPositionLeft = viewBoxHelpers.shouldPositionLeft({
          viewBoxWidth: windowWidth,
          left: elPosition.left,
          tooltipWidth: tourElWidth,
        });
        const shouldPositionRight = viewBoxHelpers.shouldPositionRight({
          viewBoxWidth: windowWidth,
          right: elPosition.right,
          left: elPosition.left,
          tooltipWidth: tourElWidth,
        });

        // Position above on mobile and tablets
        const shouldPositionAbove =
          // windowWidth < 991 ||
          viewBoxHelpers.shouldPositionAbove({
            viewBoxHeight: windowHeight,
            top: elPosition.top,
            bottom: elPosition.bottom,
            tooltipHeight: tourElHeight,
          });

        const shouldPositionBelow =
          viewBoxHelpers.shouldPositionBelow({
            viewBoxWidth: windowWidth,
            viewBoxHeight: windowHeight,
            top: elPosition.top,
            right: elPosition.right,
            bottom: elPosition.bottom,
            tooltipWidth: tourElWidth,
            tooltipHeight: tourElHeight,
          });

        if (shouldPositionLeft && !shouldPositionAbove && !shouldPositionBelow) {
          elPos = positions.left({
            position: elPosition,
            tourElWidth,
            tourElHeight,
            margin
          });
        }
        else if (shouldPositionRight && !shouldPositionAbove && !shouldPositionBelow) {
          elPos = positions.right({
            position: elPosition,
            tourElHeight,
            margin
          });
        }
        else if (shouldPositionAbove) {
          elPos = shouldPositionLeft ? positions.topLeft({
            position: elPosition,
            tourElWidth,
            tourElHeight,
            arrowSize: this.props.arrowSize,
            margin
          }) :
            shouldPositionRight ? positions.topRight({
              position: elPosition,
              tourElHeight,
              arrowSize: this.props.arrowSize,
              margin
            }) :
              positions.top({
                position: elPosition,
                tourElWidth,
                tourElHeight,
                arrowSize: this.props.arrowSize,
                margin
              });
        }
        else if (shouldPositionBelow) {
          elPos = shouldPositionLeft ? positions.bottomLeft({
            position: elPosition,
            tourElWidth,
            arrowSize: this.props.arrowSize,
            offsetHeight: el.offsetHeight,
            margin
          }) :
            shouldPositionRight ? positions.bottomRight({
              position: elPosition,
              tourElWidth,
              arrowSize: this.props.arrowSize,
              offsetHeight: el.offsetHeight,
              margin
            }) :
              positions.bottom({
                position: elPosition,
                tourElWidth,
                arrowSize: this.props.arrowSize,
                offsetHeight: el.offsetHeight,
                margin
              });
        }
        else {
          elPos = positions.ontop({
            position: elPosition,
            tourElWidth,
            arrowSize: this.props.arrowSize,
            offsetHeight: el.offsetHeight,
            margin
          });
        }
      }

      elPos.left += horizontalOffset;
      elPos.top += verticalOffset;

      this.prevPos = elPos;
      return elPos;
    }
    else {
      return this.prevPos;
    }
  }

  getCustomArrow(position) {
    return (
      typeof this.props.arrow === "function"
        ?
        this.props.arrow({
          position: position.positioned,
          width: this.width,
          height: this.height,
          size: this.props.arrowSize,
          color: this.props.arrowColor
        })
        :
        this.props.arrow
    );
  }

  render() {
    const currentTourStep = this.props.steps.filter(step => step.step === this.props.step)[0];
    if (!this.props.active || !currentTourStep) {
      return null;
    }

    if (currentTourStep.before && typeof currentTourStep.before === "function" ) {
      currentTourStep.before();
    }

    const stepPosition = this.getStepPosition({
      selector: currentTourStep.selector,
      tourElWidth: this.width,
      tourElHeight: this.height,
      overridePos: currentTourStep.position,
      margin: currentTourStep.margin || defaultMargin,
      horizontalOffset: currentTourStep.horizontalOffset,
      verticalOffset: currentTourStep.verticalOffset
    });

    const beacon = !this.props.hideBeacon
      ?
      <Beacon
        style={this.props.beaconStyle}
        position={stepPosition.positioned}
        width={this.width}
        height={this.height}
        margin={currentTourStep.margin || defaultMargin}
        size={10}
        arrowSize={this.props.arrowSize}
      />
      : null

    const arrow = (
      this.props.arrow
        ?
        this.getCustomArrow(stepPosition)
        :
        <Arrow
          position={stepPosition.positioned}
          width={this.width}
          height={this.height}
          size={this.props.arrowSize}
          color={this.props.arrowColor}
        />
    );

    const extraButtonProps = this.props.buttonStyle ? { style: this.props.buttonStyle } : {};

    const backButton = (
      this.props.step !== 1 ?
        <TourButton
          style={this.props.backButtonStyle}
          onClick={() => this.props.onBack(this.props.step - 1)}
          {...extraButtonProps}
          className="react-user-tour-back-button">
          {this.props.backButtonText}
        </TourButton> : ""
    );

    const nextButton = (
      this.props.step !== this.props.steps.length ?
        <TourButton
          style={this.props.nextButtonStyle}
          onClick={() => this.props.onNext(this.props.step + 1)}
          {...extraButtonProps}
          className="react-user-tour-next-button">
          {this.props.nextButtonText}
        </TourButton> : ""
    );

    const doneButton = (
      this.props.step === this.props.steps.length ?
        <TourButton
          style={this.props.doneButtonStyle}
          onClick={this.props.onCancel}
          {...extraButtonProps}
          className="react-user-tour-done-button">
          {this.props.doneButtonText}
        </TourButton> : ""
    );

    const tourStepsCounter = (
      !this.props.hideSteps ?
        <div style={{ position: "absolute", left: 20, bottom: 10, ...this.props.tourStepsCounterStyle }}>
          {`${this.props.step} of ${this.props.steps.length}`}
        </div> : ""
    )

    const tourButtonContainer = (
      !this.props.hideButtons ?
        <TourButtonContainer style={this.props.buttonContainerStyle}>
          {nextButton}
          {doneButton}
          {backButton}
        </TourButtonContainer> : ""
    );

    const closeButton = (
      !this.props.hideClose ?
        this.props.closeButton ?
          <span className="react-user-tour-close"
            style={{ float: "right", cursor: "pointer", width: 20, height: 20, textAlign: "center" }}
            onClick={this.props.onCancel}>
            {this.props.closeButton}
          </span>
          :
          <span className="react-user-tour-close"
            style={{ float: "right", cursor: "pointer" }}
            onClick={this.props.onCancel}>
            {this.props.closeButtonText}
          </span>
        : ""
    );

    const tourContainerStyle = {
      pointerEvents: "none",
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 100,
      ...this.props.containerStyle
    }

    const tooltipStyle = { ...this.props.style, width: this.width, height: this.height, pointerEvents: "auto" };

    const maskPosition = this.getMaskPositionAndDimensions({ selector: currentTourStep.selector })
    const maskStyle = maskPosition
      ? Object.assign({
        position: "absolute",
        left: maskPosition.left,
        top: maskPosition.top + window.pageYOffset,
        width: maskPosition.width,
        height: maskPosition.height
      }, this.getMaskStyle({ selector: currentTourStep.selector }))
      : {};

    return (
      <div className="react-user-tour-container" style={tourContainerStyle}>
        <Motion style={{x: spring(stepPosition.left), y: spring(stepPosition.top)}}>
          {({x, y}) =>

            <div style={{...tooltipStyle, transform: `translate3d(${x}px, ${y}px, 0)`, WebkitTransform: `translate3d(${x}px, ${y}px, 0)`}}>
              {beacon}
              {arrow}
              {closeButton}
              {currentTourStep.title}
              {currentTourStep.body}
              {tourStepsCounter}
              {tourButtonContainer}
            </div>
          }
        </Motion>
        {/* mask for content highlighting */}
        <div style={maskStyle} />
      </div>
    );
  }
}

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
  onCancel: () => {},
  onNext: () => {},
  onBack: () => {},
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
