import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStockNewProductComponent } from './modal-stock-new-product.component';

describe('ModalStockNewProductComponent', () => {
  let component: ModalStockNewProductComponent;
  let fixture: ComponentFixture<ModalStockNewProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalStockNewProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalStockNewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
