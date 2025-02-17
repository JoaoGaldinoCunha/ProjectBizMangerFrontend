import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddNewEmployeeComponent } from './modal-add-new-employee.component';

describe('ModalAddNewEmployeeComponent', () => {
  let component: ModalAddNewEmployeeComponent;
  let fixture: ComponentFixture<ModalAddNewEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddNewEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddNewEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
