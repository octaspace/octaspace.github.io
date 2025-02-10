import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarqueeComponent } from './marquee.component';

describe('MarqueeComponent', () => {
  let component: MarqueeComponent;
  let fixture: ComponentFixture<MarqueeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarqueeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarqueeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display logos correctly', () => {
    component.logos = [
      { src: 'assets/img/logos/Coca-Cola_logo.png', alt: 'Coca Cola' },
      { src: 'assets/img/logos/BMWasia.png', alt: 'BMW Motorrad' },
      { src: 'assets/img/logos/bungie_logo.png', alt: 'Bungie' }
    ];
    fixture.detectChanges();
    const images = fixture.nativeElement.querySelectorAll('img');
    expect(images.length).toBe(3); // Ensure 3 logos are rendered
  });
});
