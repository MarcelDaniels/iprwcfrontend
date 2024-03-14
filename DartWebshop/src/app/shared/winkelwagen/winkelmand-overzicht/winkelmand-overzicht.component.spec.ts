import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinkelmandOverzichtComponent } from './winkelmand-overzicht.component';

describe('WinkelmandOverzichtComponent', () => {
  let component: WinkelmandOverzichtComponent;
  let fixture: ComponentFixture<WinkelmandOverzichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WinkelmandOverzichtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WinkelmandOverzichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
