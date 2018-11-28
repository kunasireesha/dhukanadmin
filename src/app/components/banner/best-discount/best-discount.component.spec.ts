import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestDiscountComponent } from './best-discount.component';

describe('BestDiscountComponent', () => {
  let component: BestDiscountComponent;
  let fixture: ComponentFixture<BestDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
