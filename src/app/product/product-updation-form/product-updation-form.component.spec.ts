import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUpdationFormComponent } from './product-updation-form.component';

describe('ProductUpdationFormComponent', () => {
  let component: ProductUpdationFormComponent;
  let fixture: ComponentFixture<ProductUpdationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductUpdationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUpdationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
