import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorairesComponent } from './horaires.component';

describe('HorairesComponent', () => {
  let component: HorairesComponent;
  let fixture: ComponentFixture<HorairesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorairesComponent]
    });
    fixture = TestBed.createComponent(HorairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
