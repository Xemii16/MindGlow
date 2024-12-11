import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilsAllComponent } from './pupils-all.component';

describe('PupilsAllComponent', () => {
  let component: PupilsAllComponent;
  let fixture: ComponentFixture<PupilsAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PupilsAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PupilsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
