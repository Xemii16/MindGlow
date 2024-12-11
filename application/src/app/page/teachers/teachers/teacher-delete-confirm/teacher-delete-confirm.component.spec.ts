import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDeleteConfirmComponent } from './teacher-delete-confirm.component';

describe('RequestDeleteConfirmComponent', () => {
  let component: TeacherDeleteConfirmComponent;
  let fixture: ComponentFixture<TeacherDeleteConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherDeleteConfirmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
