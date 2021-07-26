import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KusanoComponent } from './kusano.component';

describe('KusanoComponent', () => {
  let component: KusanoComponent;
  let fixture: ComponentFixture<KusanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KusanoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KusanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
