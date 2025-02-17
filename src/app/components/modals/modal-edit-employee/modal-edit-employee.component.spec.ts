import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditEmployeeComponent } from './modal-edit-employee.component';

describe('ModalEditEmployeeComponent', () => {
  let component: ModalEditEmployeeComponent;
  let fixture: ComponentFixture<ModalEditEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
