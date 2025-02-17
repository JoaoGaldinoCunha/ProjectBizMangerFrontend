import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewStockComponent } from './modal-new-stock.component';

describe('ModalNewStockComponent', () => {
  let component: ModalNewStockComponent;
  let fixture: ComponentFixture<ModalNewStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNewStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNewStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
