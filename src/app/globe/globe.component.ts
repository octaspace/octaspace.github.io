import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.css']
})
export class GlobeComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private width!: number;
  private height!: number;
  private rotation = 0;
  private dots: Dot[] = [];

  private readonly DOTS_AMOUNT = 1000;
  private readonly DOT_RADIUS = 1.2;
  private GLOBE_RADIUS!: number;
  private GLOBE_CENTER_Z!: number;
  private PROJECTION_CENTER_X!: number;
  private PROJECTION_CENTER_Y!: number;
  private FIELD_OF_VIEW!: number;

  constructor() {}

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.setupCanvas();
    this.createDots();
    this.render();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  private setupCanvas(): void {
    this.width = this.canvas.nativeElement.clientWidth;
    this.height = this.canvas.nativeElement.clientHeight;

    const dpr = window.devicePixelRatio || 1;
    this.canvas.nativeElement.width = this.width * dpr;
    this.canvas.nativeElement.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);

    this.GLOBE_RADIUS = this.width * 0.3;
    this.GLOBE_CENTER_Z = -this.GLOBE_RADIUS;
    this.PROJECTION_CENTER_X = this.width / 2;
    this.PROJECTION_CENTER_Y = this.height / 2;
    this.FIELD_OF_VIEW = this.width * 0.8;
  }

  private createDots(): void {
    this.dots = [];

    for (let i = 0; i < this.DOTS_AMOUNT; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const x = this.GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
      const y = this.GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);
      const z = this.GLOBE_RADIUS * Math.cos(phi) + this.GLOBE_CENTER_Z;
      this.dots.push(
        new Dot(x, y, z, this.GLOBE_CENTER_Z, this.FIELD_OF_VIEW, this.PROJECTION_CENTER_X, this.PROJECTION_CENTER_Y, this.DOT_RADIUS)
      );
    }
  }

  private render(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.rotation += 0.005;
    const sineRotation = Math.sin(this.rotation);
    const cosineRotation = Math.cos(this.rotation);

    for (const dot of this.dots) {
      dot.draw(this.ctx, sineRotation, cosineRotation);
    }

    requestAnimationFrame(() => this.render());
  }

  private onResize(): void {
    this.setupCanvas();
    this.createDots();
  }
}


class Dot {
  constructor(
    public x: number,
    public y: number,
    public z: number,
    public GLOBE_CENTER_Z: number,
    public FIELD_OF_VIEW: number,
    public PROJECTION_CENTER_X: number,
    public PROJECTION_CENTER_Y: number,
    public DOT_RADIUS: number
  ) {}

  project(sin: number, cos: number): { x: number; y: number; sizeProjection: number } {
    const rotX = cos * this.x + sin * (this.z - this.GLOBE_CENTER_Z);
    const rotZ = -sin * this.x + cos * (this.z - this.GLOBE_CENTER_Z) + this.GLOBE_CENTER_Z;
    const sizeProjection = this.FIELD_OF_VIEW / (this.FIELD_OF_VIEW - rotZ);
    const xProject = rotX * sizeProjection + this.PROJECTION_CENTER_X;
    const yProject = this.y * sizeProjection + this.PROJECTION_CENTER_Y;
    return { x: xProject, y: yProject, sizeProjection };
  }

  draw(ctx: CanvasRenderingContext2D, sin: number, cos: number): void {
    const { x, y, sizeProjection } = this.project(sin, cos);
    ctx.beginPath();
    ctx.arc(x, y, this.DOT_RADIUS * sizeProjection, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = '#C31A98'; // Set fill color to white
    ctx.fill();
  }
}


