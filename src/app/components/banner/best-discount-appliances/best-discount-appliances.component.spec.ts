import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestDiscountAppliancesComponent } from './best-discount-appliances.component';

describe('BestDiscountAppliancesComponent', () => {
  let component: BestDiscountAppliancesComponent;
  let fixture: ComponentFixture<BestDiscountAppliancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestDiscountAppliancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestDiscountAppliancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
