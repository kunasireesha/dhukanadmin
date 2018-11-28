import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestAppliancesComponent } from './best-appliances.component';

describe('BestAppliancesComponent', () => {
  let component: BestAppliancesComponent;
  let fixture: ComponentFixture<BestAppliancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestAppliancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestAppliancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
