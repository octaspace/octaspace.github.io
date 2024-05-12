import { Component, OnInit, HostListener } from '@angular/core';
import { NetworkService } from './services/network.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  network: any;
  currentYear = new Date().getFullYear();
  fadeInTextContent = false; // Property to control the fade-in effect for text content
  fadeInGlassContent = false; // Property to control the fade-in effect for glass content
  fadeInGlassTransparentContent = false; // Property to control the fade-in effect for glass-transparent content

  constructor(private networkService: NetworkService) { }

  ngOnInit() {
    // Fetch data or perform initializations
    this.network = this.networkService.getNetwork().subscribe(resp => {
      this.network = resp;
    });

    // Trigger the fade-in effect for text content after a short delay
    setTimeout(() => {
      this.fadeInTextContent = true;
    }, 100);
  }

  // Function to check if the element is in the viewport
  isInViewport(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // HostListener to trigger the fade-in effect for glass content when it comes into view
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const glassElement = document.querySelector('.glass') as HTMLElement;
    const transparentElement = document.querySelector('.glass-transparent') as HTMLElement;
    const glassOffset = window.innerHeight * 0.9; // Adjust the offset as needed for glass
    const transparentOffset = window.innerHeight * 0.9; // Adjust the offset as needed for glass-transparent
  
    if (glassElement && glassElement.getBoundingClientRect().top <= glassOffset) {
      this.fadeInGlassContent = true;
    }
  
    if (transparentElement && transparentElement.getBoundingClientRect().top <= transparentOffset) {
      this.fadeInGlassTransparentContent = true;
    }
  }
}
