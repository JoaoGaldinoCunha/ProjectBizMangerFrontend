import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrderUpadateComponent } from './modal-order-upadate.component';

describe('ModalOrderUpadateComponent', () => {
  let component: ModalOrderUpadateComponent;
  let fixture: ComponentFixture<ModalOrderUpadateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalOrderUpadateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOrderUpadateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
