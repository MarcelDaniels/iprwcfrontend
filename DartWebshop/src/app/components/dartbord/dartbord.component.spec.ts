import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DartbordComponent } from './dartbord.component';

describe('DartbordComponent', () => {
  let component: DartbordComponent;
  let fixture: ComponentFixture<DartbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DartbordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DartbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
