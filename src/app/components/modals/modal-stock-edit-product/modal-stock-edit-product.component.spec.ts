import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStockEditProductComponent } from './modal-stock-edit-product.component';

describe('ModalStockEditProductComponent', () => {
  let component: ModalStockEditProductComponent;
  let fixture: ComponentFixture<ModalStockEditProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalStockEditProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalStockEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
