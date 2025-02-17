import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureListComponent } from './feature-list.component';

describe('FeatureListComponent', () => {
  let component: FeatureListComponent;
  let fixture: ComponentFixture<FeatureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 19 icons', () => {
    expect(component.icons.length).toBe(19);
  });

  it('should copy icon name to clipboard', async () => {
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    component.copyToClipboard('Compute');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Compute');
  });
});
