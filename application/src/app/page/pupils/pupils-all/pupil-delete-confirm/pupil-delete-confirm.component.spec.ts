import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilDeleteConfirmComponent } from './pupil-delete-confirm.component';

describe('RequestDeleteConfirmComponent', () => {
  let component: PupilDeleteConfirmComponent;
  let fixture: ComponentFixture<PupilDeleteConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PupilDeleteConfirmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PupilDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
