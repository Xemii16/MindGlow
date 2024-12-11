import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectOverviewMainComponent } from './subject-overview-main.component';

describe('SubjectsOverviewMainComponent', () => {
  let component: SubjectOverviewMainComponent;
  let fixture: ComponentFixture<SubjectOverviewMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectOverviewMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectOverviewMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
