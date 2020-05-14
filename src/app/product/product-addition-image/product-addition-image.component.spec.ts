import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdditionImageComponent } from './product-addition-image.component';

describe('ProductAdditionImageComponent', () => {
  let component: ProductAdditionImageComponent;
  let fixture: ComponentFixture<ProductAdditionImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAdditionImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAdditionImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
