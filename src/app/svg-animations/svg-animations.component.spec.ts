import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgAnimationsComponent } from './svg-animations.component';

describe('SvgAnimationsComponent', () => {
  let component: SvgAnimationsComponent;
  let fixture: ComponentFixture<SvgAnimationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgAnimationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgAnimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
