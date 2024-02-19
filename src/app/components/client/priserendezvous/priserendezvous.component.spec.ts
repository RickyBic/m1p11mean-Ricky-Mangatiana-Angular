import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriserendezvousComponent } from './priserendezvous.component';

describe('PriserendezvousComponent', () => {
  let component: PriserendezvousComponent;
  let fixture: ComponentFixture<PriserendezvousComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriserendezvousComponent]
    });
    fixture = TestBed.createComponent(PriserendezvousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
