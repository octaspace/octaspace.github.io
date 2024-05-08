// svg-animations.component.ts

import { Component, OnInit } from '@angular/core';

// Define classie here for TypeScript
declare const classie: any;

class SVGEl {
  el: HTMLElement;
  image: HTMLElement;
  current_frame: number;
  total_frames: number;
  path: SVGPathElement[];
  length: number[];
  handle: number;
  rendered: boolean;

  constructor(el: HTMLElement) {
    this.el = el;
    this.image = this.el.previousElementSibling as HTMLElement;
    this.current_frame = 0;
    this.total_frames = 100;
    this.path = [];
    this.length = [];
    this.handle = 0;
    this.rendered = false;
    this.init();
  }

  init(): void {
    const paths = this.el.querySelectorAll('path');
    paths.forEach((path: SVGPathElement, i: number) => {
      this.path[i] = path;
      const l = path.getTotalLength();
      this.length[i] = l;
      path.style.strokeDasharray = `${l} ${l}`;
      path.style.strokeDashoffset = `${l}`;
    });
  }

  render(): void {
    if (this.rendered) return;
    this.rendered = true;
    this.draw();
  }

  draw(): void {
    const progress = this.current_frame / this.total_frames;
    if (progress > 1) {
      cancelAnimationFrame(this.handle);
      this.showImage();
    } else {
      this.current_frame++;
      const strokeColor = '#C31A98'; // New stroke color
      this.path.forEach((path, j) => {
        path.style.stroke = strokeColor; // Update stroke color
        path.style.strokeDashoffset = `${Math.floor(this.length[j] * (1 - progress))}`;
      });
      this.handle = requestAnimationFrame(() => this.draw());
    }
  }

  showImage(): void {
    classie.addClass(this.image, 'show');
    classie.addClass(this.el, 'hide');
  }
}

@Component({
  selector: 'app-svg-animations',
  templateUrl: './svg-animations.component.html',
  styleUrls: ['./svg-animations.component.css']
})
export class SvgAnimationsComponent implements OnInit {
  private svgArr: SVGEl[] = []; // Declare svgArr as a private member array

  constructor() {}

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    const svgs = document.querySelectorAll<HTMLElement>('#main svg');

    svgs.forEach((el: HTMLElement, i: number) => {
      const svg = new SVGEl(el);
      this.svgArr[i] = svg; // Store each SVGEl instance in svgArr
      setTimeout(() => {
        if (this.inViewport(el.parentNode as HTMLElement)) {
          svg.render();
        }
      }, 250);
    });

    window.addEventListener('scroll', this.scrollHandler, false);
    window.addEventListener('resize', this.resizeHandler, false);
  }

  private inViewport(el: HTMLElement, h = 0): boolean {
    const elH = el.offsetHeight;
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    const viewed = scrolled + window.innerHeight;
    const elTop = this.getOffset(el).top;
    const elBottom = elTop + elH;

    return elTop + elH * h <= viewed && elBottom >= scrolled;
  }

  private getOffset(el: HTMLElement): { top: number; left: number } {
    let offsetTop = 0;
    let offsetLeft = 0;
    do {
      if (!isNaN(el.offsetTop)) {
        offsetTop += el.offsetTop;
      }
      if (!isNaN(el.offsetLeft)) {
        offsetLeft += el.offsetLeft;
      }
    } while ((el = el.offsetParent as HTMLElement));

    return {
      top: offsetTop,
      left: offsetLeft
    };
  }

  private scrollHandler = (): void => {
    this.scrollPage();
  };

  private scrollPage(): void {
    const svgs = document.querySelectorAll<HTMLElement>('#main svg');

    svgs.forEach((el: HTMLElement, i: number) => {
      if (this.inViewport(el.parentNode as HTMLElement, 0.5)) {
        this.svgArr[i].render(); // Access svgArr from the instance
      }
    });
  }

  private resizeTimeout: any;

  private resizeHandler = (): void => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.scrollPage();
    }, 200);
  };
}
