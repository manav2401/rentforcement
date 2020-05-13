import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { formatDate } from '@angular/common';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product?: Product;
  testProduct: Product;
  expiryMessage: string;
  availabilityMessage: string;
  test: string;
  daysAvailable: number = 0;
  currDate: Date = new Date();
  productDate: Date;

  constructor(private route: Router, 
    private prodService: ProductService,
  ) {
      this.product = new Product();
      this.availabilityMessage = "";
      this.expiryMessage = "";
  }

  ngOnInit(): void {
    this.getProductDetails(this.getProductIdFromUrl());
  }

  getProductIdFromUrl(): number{
    let curl = this.route.url;
    let arr = curl.split("/",5);
    let prodId = Number(arr[3])
    return prodId;
  }

  getProductDetails(prodId: number): void{

    this.prodService.getProductDetails(prodId).subscribe(
      data => this.setProduct(data),
      error => console.log("Error in fetching product details!")
    ) 
  }


  setProduct(data){
    this.product = data;
    this.productDate = new Date(this.product.doa);
    let d1: number = this.product.duration
    let d2: number = this.currDate.getTime() - this.productDate.getTime();
    d2 = Math.round(d2 / (1000 * 3600 * 24));
    if (d2 < 0) {
      this.availabilityMessage = "This product currently not available!";
    } else {
      let num: number = 0;
      num = d1 - d2;
      this.availabilityMessage = "This product is available for next " + num.toString() + " days";
    }
  }

  addToCart(event) {

    console.log("Adding to cart!")
    if (localStorage.getItem("username")==null) {
      this.route.navigate(['login']);
    } else {
      this.prodService.addProductToCart(this.product.id).subscribe(
        data => console.log("Product Added to Cart!" + data),
        error => console.log("Error in adding product!" + error)        
      )
      const cart_url = "cart"
      const url = `${cart_url}/${localStorage.getItem("username")}`
      this.route.navigate([url])
    }

  } 
  
}

