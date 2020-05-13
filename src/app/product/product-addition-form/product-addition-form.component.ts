import { Component, OnInit, Input } from '@angular/core';
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

  category: any = ['Electronics', 'Clothes', 'Household', 'Games', 'Books', 'Industrial', 'Other'];
  startDate = new Date();
  minDate = new Date();
  maxDate = new Date(2020, 11, 31);
  selectedDate: string;

  @Output() newFormEvent = new EventEmitter<FormGroup>();

  @Input() product: Product;
  constructor( private productService : ProductService ) { }

  ngOnInit(): void {

      if(this.product!= null){
      //console.log("Product Name " + this.product.age);
      this.productAdditionForm.get('name').setValue(this.product.name);
      this.productAdditionForm.get('age').setValue(this.product.age);
      this.productAdditionForm.get('desc').setValue(this.product.desc);
      this.productAdditionForm.get('category').setValue(this.product.category);
      this.productAdditionForm.get('duration').setValue(this.product.duration);
      this.productAdditionForm.get('doa').setValue(this.product.doa);
      this.productAdditionForm.get('price').setValue(this.product.price);
      
    }
    
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
    this.product.doa = this.selectedDate;
    // console.log("Child " + this.product.name);
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

  dateInput(event) {
    console.log(event.value)
    const temp: Date = event.value;
    // this.dateInput = temp.toDateString;
    this.selectedDate = temp.toDateString();
  }

  
  onChange(e: any){
    this.productAdditionForm.get('category').setValue(e.target.value);
  }

}
