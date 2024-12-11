import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPupilDialogComponent } from './add-pupil-dialog.component';

describe('RequestDeleteConfirmComponent', () => {
  let component: AddPupilDialogComponent;
  let fixture: ComponentFixture<AddPupilDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPupilDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPupilDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
