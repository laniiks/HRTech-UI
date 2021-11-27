import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompanyGetByIdComponent } from './new-company-get-by-id.component';

describe('NewCompanyGetByIdComponent', () => {
  let component: NewCompanyGetByIdComponent;
  let fixture: ComponentFixture<NewCompanyGetByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCompanyGetByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCompanyGetByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
