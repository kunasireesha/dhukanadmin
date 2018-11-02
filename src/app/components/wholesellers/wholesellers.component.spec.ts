import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WholesellersComponent } from './wholesellers.component';

describe('WholesellersComponent', () => {
  let component: WholesellersComponent;
  let fixture: ComponentFixture<WholesellersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WholesellersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WholesellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
