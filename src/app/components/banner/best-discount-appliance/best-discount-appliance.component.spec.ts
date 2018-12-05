import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestDiscountApplianceComponent } from './best-discount-appliance.component';

describe('BestDiscountApplianceComponent', () => {
  let component: BestDiscountApplianceComponent;
  let fixture: ComponentFixture<BestDiscountApplianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestDiscountApplianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestDiscountApplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
