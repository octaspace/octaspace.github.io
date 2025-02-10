import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-marquee',
  templateUrl: './marquee.component.html',
  styleUrls: ['./marquee.component.css']
})
export class MarqueeComponent implements OnInit {
  @Input() logos: { src: string, alt: string }[] = [];
  @Input() animationDuration: string = '60s'; // Default duration

  constructor() { }

  ngOnInit(): void {
    if (this.logos.length === 0) {
      this.logos = [
        { src: 'assets/img/logos/logo1.png', alt: 'Logo 1' },
        { src: 'assets/img/logos/logo2.png', alt: 'Logo 2' },
        { src: 'assets/img/logos/logo3.png', alt: 'Logo 3' }
      ]; // Default logos if none are passed
    }
  }
}
