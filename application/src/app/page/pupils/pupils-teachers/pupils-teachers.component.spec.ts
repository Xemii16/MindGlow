import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilsTeachersComponent } from './pupils-teachers.component';

describe('PupilsTeachersComponent', () => {
  let component: PupilsTeachersComponent;
  let fixture: ComponentFixture<PupilsTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PupilsTeachersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PupilsTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
