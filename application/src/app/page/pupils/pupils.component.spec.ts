import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilsComponent } from './pupils.component';

describe('PupilsComponent', () => {
  let component: PupilsComponent;
  let fixture: ComponentFixture<PupilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PupilsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PupilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
