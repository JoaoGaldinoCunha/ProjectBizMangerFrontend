import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStockEditProductQuantityComponent } from './modal-stock-edit-product-quantity.component';

describe('ModalStockEditProductQuantityComponent', () => {
  let component: ModalStockEditProductQuantityComponent;
  let fixture: ComponentFixture<ModalStockEditProductQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalStockEditProductQuantityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalStockEditProductQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
