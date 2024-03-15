import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurroundsComponent } from './surrounds.component';

describe('SurroundsComponent', () => {
  let component: SurroundsComponent;
  let fixture: ComponentFixture<SurroundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SurroundsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurroundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
