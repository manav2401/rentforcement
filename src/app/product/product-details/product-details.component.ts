import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { formatDate } from '@angular/common';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ProductVisual } from '../productVisual';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() id: number;

  // Product
  product?: Product;
  testProduct: Product;
  productImage: ProductVisual;
  productEndDate: string;

  availabilityMessage: string;
  test: string;

  // Days for product is available
  daysAvailable: number = 0;
  currDate: Date = new Date();
  productDate: Date;
  available: boolean = true;

  // session
  session: number = 0;
  owner: number = 0;

  constructor(private route: Router, 
    private prodService: ProductService,
  ) {
      this.product = new Product();
      this.availabilityMessage = "";
  }

  ngOnInit(): void {

    this.available = true;
    this.getProductDetailsWithImage(this.id);
    
    if (localStorage.getItem("username")) {
      this.session = 1;
      this.owner = 1;
    } else {
      this.session = 0;
      this.owner = 1;
    }

  }


  getProductDetailsWithImage(prodId: number): void{

    // fetching product details
    this.prodService.getProductDetailsWithImage(prodId).subscribe(
      data => this.fetchproductAvailability(data, prodId),
      error => console.log("Error in fetching product details!")
    ) 
    // this.setProduct(tempData, tempData2);

  }

  fetchproductAvailability(data: ProductVisual, prodId: number) {
    this.productImage = data;
    this.product = this.productImage.product;

    // fetching product availability details
    this.prodService.fetchProductAvailability(prodId).subscribe(
      data => this.setProduct(data),
      error => console.log("Error in fetching product availability details!")
    )    
  }

  setProduct(data){

    this.productEndDate = data;

    // Check1
    this.productDate = new Date(this.product.doa);
    let d1: number = this.product.duration
    let d2: number = this.currDate.getTime() - this.productDate.getTime();
    d2 = Math.floor(d2 / (1000 * 3600 * 24));

    // Check2
    let endTime: number = new Date(this.productEndDate).getTime();
    let currentTime: number = new Date().getTime();
    
    if (d2 < 0) {
      this.availabilityMessage = "This product currently not available for rent! Please check again later!";
      this.available = false;
    } else if ((d1-d2)<=0){
      this.availabilityMessage = "This product is no longer available for rent!"
      this.available = false;
    } else if(currentTime < endTime) {
      this.availabilityMessage = "This product is already on rent! Please check again later!";
      this.available = false;
    } else {
      let num: number = 0;
      num = d1 - d2;
      this.availabilityMessage = "This product is available for next " + num.toString() + " days";
      this.available = true;
    }
  }

  goToProductUpdation(): void{
    //this.prodService.product = this.product;
    this.route.navigate(['/dashboard/updateProduct', this.id]);
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


/*
  getProductIdFromUrl(): number{
    let curl = this.route.url;
    let arr = curl.split("/",5);
    let prodId = Number(arr[3])
    return prodId;
  }
*/