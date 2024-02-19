import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueRendezvousComponent } from './historique-rendezvous.component';

describe('HistoriqueRendezvousComponent', () => {
  let component: HistoriqueRendezvousComponent;
  let fixture: ComponentFixture<HistoriqueRendezvousComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueRendezvousComponent]
    });
    fixture = TestBed.createComponent(HistoriqueRendezvousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
