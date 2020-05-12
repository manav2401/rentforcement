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


  constructor(private route: Router, 
    private prodService: ProductService,
     ) {
      this.product = new Product();
      //  this.testProduct = new Product();
      //  this.testProduct.age = 17;
      //  console.log(this.testProduct.age);
       console.log("Initialized Constructor");
       this.availabilityMessage = "";
       this.expiryMessage = "";

  }


  ngOnInit(): void {
    console.log("Initialized ng function");
    this.getProductDetails(this.getProductIdFromUrl());
    
    
  }

  getProductIdFromUrl(): number{
    let curl = this.route.url;
    let arr = curl.split("/",5);
    let prodId = Number(arr[3])
    return prodId;


  }

  getProductDetails(prodId: number): void{


    // this.prodService.getProductDetails(prodId).subscribe((data: Product) => this.product = {
    //   id: data['id'],
    //   name: data['name'],
    //   age: data['age'],
    //   desc: data['desc'],
    //   category: data['category'],
    //   doa: data['doa'],
    //   duration: data['duration'],
    //   available: data['available']
    // });

    
    this.prodService.getProductDetails(prodId).subscribe((data: Product) => { this.setProduct(data) });
      // this.product = data;
      // console.log(data['id']);
      // console.log(typeof(data['doa']));
      // console.log(this.product);
      // this.test = data['doa']});

      //console.log("Data is " + this.product.id);
      
  }


  setProduct(data){
    this.product = data;
    console.log("Data is " + this.product.id);
    this.checkProductAvailability();
    this.checkProductExpiry();
  }

  getCurrentDate(): Array<number>{

    let today: String = formatDate(new Date(),'dd-MM-yyyy','en');
    let arr: Array<string> = today.split('-',3);
    let currentDate: Array<number>;
    currentDate = [ Number(arr[0]), Number(arr[1]), Number(arr[2])];

    //console.log(currentDate[1]);
    return currentDate;
  }

  getProductDate(doa: string): Array<number>{
    let arr: Array<string> = doa.split('/',3);
    let productDate: Array<number> = [ Number(arr[0]), Number(arr[1]), Number(arr[2])];
    return productDate;
  }

  

  checkProductExpiry(): boolean{
    let doa: string = this.product.doa;
    let cDate = this.getCurrentDate();
    console.log("Checking for product expiry " + this.product.doa);
    let pDate = this.getProductDate(doa);

    let temp: boolean = false;

    if(pDate[2] > cDate[2]){
      temp = true;
    }
    else if(pDate[1] > cDate[1]){
      temp = true;
    }
    else if(pDate[0] > cDate[0]){
      temp = true;
    }
    if(temp){
      this.expiryMessage = "Product Renting period has Expired!!!";
      this.product.available = false;
    }
    else{
      this.expiryMessage = "";
    }
    return temp;
    

  }
  checkProductAvailability(): void{
    if(this.product.available){
      this.availabilityMessage = "Product is available!!!!";
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

