import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-addition',
  templateUrl: './product-addition.component.html',
  styleUrls: ['./product-addition.component.css']
})
export class ProductAdditionComponent implements OnInit {

  product: Product;
  file: File

  selector: number;
  constructor( private productService : ProductService ) { 
    this.selector = 1;
  }

  ngOnInit(): void {
    this.selector = 1;
  }

  getProductDetails( productAdditionForm: FormGroup ){
    this.product = productAdditionForm.value;
    console.log("Parent " + this.product.name);
    this.product.id=1;
    
    this.selector = 2;

  }

  getImageFile( file: File){
    this.file = file;

  }


  uploadProductDetails(){

    console.log("In FUNCTION")
    // this.productService.addNewProduct(this.file, this.product);
    this.productService.addProduct(this.product).subscribe(
      data => console.log("Product Sent!"),
      error => console.log("Error in sending product!")
    )


  }
  
  
}




// productAdditionForm = new FormGroup({
//   name: new FormControl('', [ Validators.maxLength(20), Validators.required]),
//   age: new FormControl('', [Validators.required]),
//   desc: new FormControl('', [Validators.maxLength(50), Validators.required]), 
//   category: new FormControl('', Validators.required),
//   duration: new FormControl('', Validators.required),
//   doa: new FormControl('', Validators.required),
//   price: new FormControl('', Validators.required)
// })


// addProduct(): void{
//   console.log(this.productAdditionForm.value);
//   this.product = this.productAdditionForm.value;
//   console.log(this.product.name);
//   this.product.id=1;
//   this.productService.addProduct(this.product).subscribe(
//     data => {this.displayDataInConsole(data)});

// }

// displayDataInConsole(data: any){
//   console.log(data);
// }
