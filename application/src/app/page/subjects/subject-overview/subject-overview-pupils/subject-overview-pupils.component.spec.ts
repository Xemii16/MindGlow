import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectOverviewPupilsComponent } from './subject-overview-pupils.component';

describe('SubjectOverviewPupilsComponent', () => {
  let component: SubjectOverviewPupilsComponent;
  let fixture: ComponentFixture<SubjectOverviewPupilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectOverviewPupilsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectOverviewPupilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
