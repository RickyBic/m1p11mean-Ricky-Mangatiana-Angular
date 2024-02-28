import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorairetravailComponent } from './horairetravail.component';

describe('HorairetravailComponent', () => {
  let component: HorairetravailComponent;
  let fixture: ComponentFixture<HorairetravailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorairetravailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorairetravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
