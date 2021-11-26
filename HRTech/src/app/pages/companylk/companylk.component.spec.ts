import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanylkComponent } from './companylk.component';

describe('CompanylkComponent', () => {
  let component: CompanylkComponent;
  let fixture: ComponentFixture<CompanylkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanylkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanylkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
