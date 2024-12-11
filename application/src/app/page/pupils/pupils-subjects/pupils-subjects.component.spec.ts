import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilsSubjectsComponent } from './pupils-subjects.component';

describe('PupilsSubjectsComponent', () => {
  let component: PupilsSubjectsComponent;
  let fixture: ComponentFixture<PupilsSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PupilsSubjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PupilsSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
