import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDeleteConfirmComponent } from './request-delete-confirm.component';

describe('RequestDeleteConfirmComponent', () => {
  let component: RequestDeleteConfirmComponent;
  let fixture: ComponentFixture<RequestDeleteConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestDeleteConfirmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
