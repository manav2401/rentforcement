import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formValidatorIsNumeric, updateDurationValidator } from '../form-validators';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-updation-form',
  templateUrl: './product-updation-form.component.html',
  styleUrls: ['./product-updation-form.component.css']
})
export class ProductUpdationFormComponent implements OnInit {


  @Output() updateProductEvent = new EventEmitter<Product>();

  @Input() id: number;
  
  @Output() product?: Product;

  category: any = ['Electronics', 'Clothes', 'Household', 'Games', 'Books', 'Industrial', 'Other'];

  constructor( private productService: ProductService ) { }

  ngOnInit(): void {
    this.product = this.productService.product;

    //this.getProductDetails(this?.id);


    if(this?.product != null){
      console.log("Product Name " + this.product.age);
      this.productUpdationForm.get('name').setValue(this.product.name);
      this.productUpdationForm.get('age').setValue(this.product.age);
      this.productUpdationForm.get('desc').setValue(this.product.desc);
      this.productUpdationForm.get('category').setValue(this.product.category);
      this.productUpdationForm.get('duration').setValue(this.product.duration);
      //this.productUpdationForm.get('doa').setValue(this.product.doa);
      this.productUpdationForm.get('price').setValue(this.product.price);
      
    }
    else{
      console.log("Child Product Not fetched");
    }
  }

  productUpdationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    age: new FormControl('', [Validators.required, formValidatorIsNumeric]),
    desc: new FormControl('', [Validators.maxLength(50), Validators.required]), 
    category: new FormControl('', Validators.required),
    duration: new FormControl('', [Validators.required, formValidatorIsNumeric, 
      updateDurationValidator(this.productService.product?.duration)]),
    //doa: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, formValidatorIsNumeric])

  })



  updateProduct(){
    this.product.name = this.productUpdationForm.get('name').value;
    this.product.age = this.productUpdationForm.get('age').value;
    this.product.desc = this.productUpdationForm.get('desc').value;
    this.product.category = this.productUpdationForm.get('category').value;
    this.product.duration = this.productUpdationForm.get('duration').value;
    this.product.price = this.productUpdationForm.get('price').value;
    this.product.doa = this.productService.product.doa;
    this.updateProductEvent.emit(this.product);
    console.log("Child after updation ");
    console.log(this.product);


  }


  buttonTesting(){
    console.log("Button clicked");
  }


  onChange(e: any){
    this.productUpdationForm.get('category').setValue(e.target.value);
  }

}
