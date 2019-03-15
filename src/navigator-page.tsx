import React, { SFC, useEffect, useState, ReactNode } from "react";
import ReactDOM from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { css } from "emotion";

let transitionDuration = 160;

interface IProps {
  visible: boolean;
  onClose: () => void;
  renderContent: () => ReactNode;
}

export default class NavigatorPage extends React.Component<IProps, any> {
  el: HTMLDivElement;
  constructor(props) {
    super(props);

    this.el = document.createElement("div");
  }

  componentDidMount() {
    let root = document.querySelector(".navigator-container");
    root.appendChild(this.el);
  }

  componentWillUnmount() {
    let root = document.querySelector(".navigator-container");
    root.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      <div onClick={this.onContainerClick}>
        <TransitionGroup className={styleAnimations}>
          {this.props.visible ? (
            <CSSTransition classNames="backdrop" timeout={{ enter: transitionDuration, exit: transitionDuration }}>
              <div className={styleBackdrop} />
            </CSSTransition>
          ) : null}
          {this.props.visible ? (
            <CSSTransition classNames="slider" timeout={{ enter: transitionDuration, exit: transitionDuration }}>
              <div className={stylePopPage}>{this.props.renderContent()}</div>
            </CSSTransition>
          ) : null}
        </TransitionGroup>
      </div>,
      this.el
    );
  }

  onContainerClick(event) {
    event.stopPropagation();
  }
}

let styleAnimations = css`
  .slider-enter {
    left: 100%;
    width: 100%;
  }
  .slider-enter.slider-enter-active {
    left: 0%;
  }
  .slider-exit {
    left: 0%;
  }
  .slider-exit.slider-exit-active {
    left: 100%;
  }

  .backdrop-enter {
    opacity: 0;
  }
  .backdrop-enter.backdrop-enter-active {
    opacity: 1;
  }
  .backdrop-exit {
    opacity: 1;
  }
  .backdrop-exit.backdrop-exit-active {
    opacity: 0;
  }
`;

let stylePopPage = css`
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: white;

  transition: ${transitionDuration}ms;
  transition-timing-function: linear;
`;

let styleBackdrop = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: hsla(0, 0%, 0%, 0.3);
  transition: ${transitionDuration}ms;
  transition-timing-function: linear;
`;
