import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumcountComponent } from './numcount.component';

describe('NumcountComponent', () => {
  let component: NumcountComponent;
  let fixture: ComponentFixture<NumcountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumcountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
