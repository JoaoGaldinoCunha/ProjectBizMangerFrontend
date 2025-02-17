import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteinerHistoryAndObejectiveComponent } from './conteiner-history-and-obejective.component';

describe('ConteinerHistoryAndObejectiveComponent', () => {
  let component: ConteinerHistoryAndObejectiveComponent;
  let fixture: ComponentFixture<ConteinerHistoryAndObejectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConteinerHistoryAndObejectiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConteinerHistoryAndObejectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
