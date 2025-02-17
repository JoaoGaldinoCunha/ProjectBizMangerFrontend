import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilieScreenComponent } from './profilie-screen.component';

describe('ProfilieScreenComponent', () => {
  let component: ProfilieScreenComponent;
  let fixture: ComponentFixture<ProfilieScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilieScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilieScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
