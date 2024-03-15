import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DartPijlenComponent } from './dart-pijlen.component';

describe('DartPijlenComponent', () => {
  let component: DartPijlenComponent;
  let fixture: ComponentFixture<DartPijlenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DartPijlenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DartPijlenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
