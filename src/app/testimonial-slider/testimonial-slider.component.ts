import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonial-slider',
  templateUrl: './testimonial-slider.component.html',
  styleUrls: ['./testimonial-slider.component.css']
})
export class TestimonialSliderComponent implements OnInit {
  testimonials = [
    {
        "name": "Carson Reed",
        "position": "CEO - CinemaMotions",
        "photo": "assets/img/carson.jpg",
        "text": "I've been using OctaSpace's incredible OctaRender for the past few months now and here's my breakdown: <ul><li>Ease of Use is incredible, Click upload and let it run</li><li>Speed is absolutely INSANE, you can scale up or down depending on your project needs</li><li>Worth it. 100%</li>",
        "service": "OctaRender"
    },
    {
      "name": "Marc Wines",
      "position": "VPN user",
      "photo": "assets/img/marc.jpg",
      "text": "This is the best VPN of all time. I cant believe people actually buy VPN Express, Nord, Surf Shark, etc. This is the only pay as you go VPN I've ever heard of and in 6 months of using this & the mobile app whenever I need to use them I've spent a whopping $0.85. Great app, smooth experience, and the cheapest one around.",
      "service": "VPN"
  },
    {
        "name": "mide ♦️",
        "position": "Artist",
        "photo": "assets/img/mide.jpg",
        "text": "Absolutely amazing. Life changing, I wouldn’t worry about rendering complex scenes cause Octaspace got me. Best I have seen so far. The speed ? Absolutely stunning. I recommend",
        "service": "OctaRender",
        "twitter": "@ayomideXCII"
    },
    {
        "name": "MiDaY_i",
        "position": "Artist",
        "photo": "assets/img/miday.jpg",
        "text": "It was actually way faster than my usual method for getting heavy renders done and I was very suprised, will definitely be using it a lot for my heavy projects moving forward.",
        "service": "OctaRender",
        "twitter": "@MiDaY__i"
    },
    {
        "name": "Clopulis",
        "position": "VPN user",
        "photo": "assets/img/Clopulis.jpg",
        "text": "Huge shout-out to OctaSpace for their incredible decentralized VPN. I cancelled my NordVPN subscription to try OctaVPN. It's pay-as-you-use & much smoother on PC & Mobile. The 2 year plan for Nord was $3.69/month. In 5.5 months, OctaVPN has cost me $0.87.",
        "service": "VPN",
        "twitter": "@clopulis"
    },
    {
        "name": "Clar◎is",
        "position": "Artist",
        "photo": "assets/img/Clar.jpg",
        "text": "Best render farm that running on blockchain technology. Best thing is, #OctaRender supporting both EEVEE & Cycles render too. I have used the platform to render my art & freelance project. Definitely will use it again! 😍",
        "service": "OctaRender",
        "twitter": "@Clarois3D"
    }
  ];

  currentTestimonial: any;
  index = 0;

  constructor() { }

  ngOnInit(): void {
    this.updateTestimonial();
    setInterval(() => this.updateTestimonial(), 5000);
  }

  updateTestimonial(): void {
    this.currentTestimonial = this.testimonials[this.index];
    this.index = (this.index + 1) % this.testimonials.length;
  }

  getServiceLabelClass(service: string): string {
    switch (service) {
      case 'OctaRender':
        return 'service-label-octarender';
      case 'VPN':
        return 'service-label-vpn';
      case 'Compute':
        return 'service-label-compute';
      case 'Ai':
        return 'service-label-ai';
      default:
        return '';
    }
  }
}
