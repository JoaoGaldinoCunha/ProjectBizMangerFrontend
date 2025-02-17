import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrderWithdrawalComponent } from './modal-order-withdrawal.component';

describe('ModalOrderWithdrawalComponent', () => {
  let component: ModalOrderWithdrawalComponent;
  let fixture: ComponentFixture<ModalOrderWithdrawalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalOrderWithdrawalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOrderWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
