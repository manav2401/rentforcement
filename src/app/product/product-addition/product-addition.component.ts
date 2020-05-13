import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-addition',
  templateUrl: './product-addition.component.html',
  styleUrls: ['./product-addition.component.css']
})
export class ProductAdditionComponent implements OnInit {

  product: Product;
  imageFiles: Array<File>;

  selector: number;
  constructor( private productService : ProductService,private router: Router) { 
    this.selector = 1;
  }

  ngOnInit(): void {
  //Start with product details form filling
    this.selector = 1;
  }

  //Product-addition-form event collector
  getProductDetails( productAdditionForm: FormGroup ){
    console.log("Product Received by parent");
    this.product = productAdditionForm.value;
    console.log("Parent " + this.product.age);
    this.product.id=1;
    

    //Opening Image Handler
    // this.selector = 2;

  }

  //Image-handler event collector
  getImageFiles( files: Array<File>){
    this.imageFiles = files;
    console.log("received by parent");
    this.uploadProductDetails();

  }

  //Finally calling API to backend
  // uploadProductDetails(){

  //   console.log("Ready to call API");
  //   //this.productService.addNewProduct(this.files, this.product);
  //   this.addProduct();

  // }

  uploadProductDetails(){
    this.productService.addProduct(this.product).subscribe(
      data => console.log("Product Sent!"),
      error => console.log("Error in sending product!")
    )
    this.router.navigate(['dashboard']);
  }

  redirectToProductForm(): void{
    this.selector = 1;
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
