import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditCompanyComponent } from './modal-edit-company.component';

describe('ModalEditCompanyComponent', () => {
  let component: ModalEditCompanyComponent;
  let fixture: ComponentFixture<ModalEditCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
