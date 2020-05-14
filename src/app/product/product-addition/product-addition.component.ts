import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { ImageService } from '../image.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-addition',
  templateUrl: './product-addition.component.html',
  styleUrls: ['./product-addition.component.css']
})
export class ProductAdditionComponent implements OnInit {

  msg: string;
  product: Product;
  file: File;

  selector: number;
  constructor( private productService: ProductService,
  private router: Router,
  private imageService: ImageService,
  private _snackBar: MatSnackBar
  ) { 
  }

  ngOnInit(): void {
  //Start with product details form filling
    this.selector = 1;
  }

  //Product-addition-form event collector
  getProductDetailsFromChild( productAdditionForm: FormGroup ){
    // console.log("Product Received by parent");
    this.product = productAdditionForm.value;
    // console.log("Parent " + this.product.age);
    this.product.id=1;
    
    //Redirecting to Image Handler
    this.selector = 2;

  }

  getImageFilesFromChild(file: File){
    console.log("Image file received by parent");
    this.file = file;
  }

  imageChildEventHandler(select: number){
    this.selector = select;
  }

  uploadProduct(temp: any){
    if(this.product != null && this.file && temp == true){
      this.productService.addProduct(this.product).subscribe(data => {
        this.uploadImage(this.file, Number(data))
      });

      // Making API Call to add product availability
      this.productService.addProductAvailabillity(this.product.doa).subscribe(
        data => console.log("Product Availability Sent!"),
        error => console.log("Error in sending product availability!")
      )
      
      this.router.navigate(['dashboard/products/all']);
    }
    else{
      console.log("Product Addition incomplete");
    }
  }

  uploadImage(file: File, productId: number){

    this.imageService.uploadLoadImage(file, productId).subscribe(data => { this.setDisplayMessage(data)});

  }

  redirectToProductForm(): void{
    this.selector = 1;
  }  

  setDisplayMessage(data: any){
    // window.alert(data);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  
}
