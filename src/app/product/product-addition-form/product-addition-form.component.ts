import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';
import { formValidator, formValidatorIsNumeric } from '../form-validators';


@Component({
  selector: 'app-product-addition-form',
  templateUrl: './product-addition-form.component.html',
  styleUrls: ['./product-addition-form.component.css']
})
export class ProductAdditionFormComponent implements OnInit {

  @Output() newFormEvent = new EventEmitter<FormGroup>();

  product: Product;
  constructor( private productService : ProductService ) { }

  ngOnInit(): void {
    
  }

  productAdditionForm = new FormGroup({
    name: new FormControl('', [ Validators.maxLength(20), Validators.required]),
    age: new FormControl('', [Validators.required, formValidatorIsNumeric]),
    desc: new FormControl('', [Validators.maxLength(50), Validators.required]), 
    category: new FormControl('', Validators.required),
    duration: new FormControl('', [Validators.required, formValidatorIsNumeric]),
    doa: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, formValidatorIsNumeric])
  })

  

  addProduct(): void{

    this.product = this.productAdditionForm.value;
    console.log("Child " + this.product.name);
    this.newFormEvent.emit(this.productAdditionForm);


    // this.product = this.productAdditionForm.value;
    // console.log(this.product.name);
    // this.product.id=1;
    // this.productService.addProduct(this.product).subscribe(
    //   data => {this.displayDataInConsole(data)});

  }

  displayDataInConsole(data: any){
    console.log(data);
  }

}
