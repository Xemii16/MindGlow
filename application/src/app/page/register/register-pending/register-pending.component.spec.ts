import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPendingComponent } from './register-pending.component';
import { beforeEach, describe, it } from 'node:test';

describe('RegisterSuccessComponent', () => {
  let component: RegisterPendingComponent;
  let fixture: ComponentFixture<RegisterPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPendingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
  });
});

