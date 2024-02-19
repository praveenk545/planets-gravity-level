import { Component } from '@angular/core';

export interface IBallConfig {
  color: string;
  gravity: number;
}

export class BounceBall implements IBallConfig {
  private viewport: number;
  private height: number;
  private initCss: string;
  constructor(public color: string, public gravity: number) {
    this.gravity = Math.round((1 / gravity) * 400);
    this.viewport = window.innerHeight - 200;
    this.height = Math.round(this.viewport * 0.9);
    this.initCss = this.getCss(this.color, this.gravity);
  }
  getCss(col: string, grav: number): string {
    return `
#ball {

  /* animation properties */
  animation-name: bounce;
  animation-duration: ${grav}ms;
  animation-direction: alternate;
  animation-timing-function: cubic-bezier(.6,0.08,0.8,.6);
  animation-iteration-count: infinite;
}

@keyframes bounce {
  from {
    transform: translate3d(0, 0, 0);
    box-shadow: 0 ${this.height + 50}px 100px  rgba(0, 0, 0, 0.05),
      inset 0 -15px 15px -5px rgba(0,0,0,0.2);
  }
  to   {
    transform: translate3d(0, ${this.height + 10}px, 0);
    box-shadow: 0px 15px 10px rgba(0, 0, 0, 0.1),
      inset 0 -15px 15px -5px rgba(0,0,0,0.3);
  }
}

/* Vendor prefixes -- adds support for the browsers that need it */
/* See http://caniuse.com/#feat=css-animation for support matrix */
#ball {
  -webkit-animation-name: bounce;
  -webkit-animation-duration: ${grav}ms;
  -webkit-animation-direction: alternate;
  -webkit-animation-timing-function: cubic-bezier(.6,0.08,0.8,.6);
  -webkit-animation-iteration-count: infinite;
}

@-webkit-keyframes bounce {
  from {
    -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0);
    box-shadow: 0 ${this.height + 50}px 100px  rgba(0, 0, 0, 0.05),
      inset 0 -15px 15px -5px rgba(0,0,0,0.2);
    }
  to   {
    -webkit-transform: translate3d(0, ${
      this.height + 10
    }px, 0); transform: translate3d(0, ${this.height + 10}px, 0);
    box-shadow: 0px 15px 10px rgba(0, 0, 0, 0.1),
      inset 0 -15px 15px -5px rgba(0,0,0,0.3);
  }
}
`;
  }
  private addRemoveStyle(css: string) {
    let head = document.head || document.getElementsByTagName('head')[0];
    let oldStyle: any = document.getElementById('ball-styles');
    if (oldStyle) {
      oldStyle.parentNode.removeChild(oldStyle);
    }

    let style: any = document.createElement('style');

    style.id = 'ball-styles';
    style.type = 'text/css';
    if (style['styleSheet']) {
      style['styleSheet'].cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
  }

  public addStyle() {
    this.addRemoveStyle(this.initCss);
  }

  public removeStyle() {
    this.addRemoveStyle(this.getCss('', 0));
  }
}
