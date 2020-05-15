import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product }from './product';
import { Observable } from 'rxjs';
import { UpperCasePipe } from '@angular/common';
import { ProductAvailable } from './product-available';
import { ProductVisual } from './productVisual';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url_list: string;
  url_details : string;
  url_add : string;
  url_upload : string;
  url_update: string;
  products: Product[];

  //Shared content between product list , product detail and product updation
  product: Product

  // Username to send
  usernameToggle: string;

  constructor( private http: HttpClient ) {  
  }

  getProductList(category: String, tmp: boolean): Observable<any>{
    this.url_list = "http://localhost:8080/products";
    this.url_list = this.url_list + "/" + category;
    let currUserName: string;
    if (tmp==true) {
      currUserName = localStorage.getItem("username");
    } else {
      currUserName = "@";
    }

    // if (currUserName==null || localStorage.getItem("toggle")=="0") {
    //   currUserName = "@";
    // }
    const headers = {
      headers: new HttpHeaders({
        "username": currUserName
      })
    }

    console.log("About to fetch Product List" + currUserName);
    return this.http.get<Product[]>(this.url_list,headers);
  }

  getProductListWithImages(category: String, toggle: boolean): Observable<any>{
    this.url_list = "http://localhost:8080/productImgs";
    this.url_list = this.url_list + "/" + category;

    let currentUserName: string;
    if(toggle){
      currentUserName = localStorage.getItem("username");
    }
    else{
      currentUserName = "@"
    }

    const headers = {
      headers: new HttpHeaders({
        "username": currentUserName
      })
    }

    console.log("About to fetch Product List" + currentUserName);
    return this.http.get<ProductVisual[]>(this.url_list,headers);
  }

  getProductDetailsWithImage(id: number): Observable<any>{
    this.url_details = "http://localhost:8080/productImg";
    this.url_details = this.url_details + "/" + id;
    console.log(this.url_details);
    //this.http.get<Product>(this.url_details).subscribe((data) => {console.log(data) })
    return this.http.get<ProductVisual>(this.url_details);
  }

  getProductDetails(id: number): Observable<any>{
    this.url_details = "http://localhost:8080/product";
    this.url_details = this.url_details + "/" + id;
    console.log(this.url_details);
    //this.http.get<Product>(this.url_details).subscribe((data) => {console.log(data) })
    return this.http.get<Product>(this.url_details);
  }

  //Sends only product to backend 
  addProduct(product: Product): Observable<any>{
    console.log("Service " + product.name);
    this.url_add = "http://localhost:8080/addProduct";
    const headers = {
      headers : new HttpHeaders({
        "token": localStorage.getItem("username")
      })
    }  
    console.log("About to fire post query on " + this.url_add);
    return this.http.post(this.url_add, product, headers);
  }

  updateProduct( product: Product ): Observable<any>{
      this.url_update = "http://localhost:8080/updateProduct";
      return this.http.put(this.url_update, product);
  }

  addProductAvailabillity(str: String) : Observable<any> {
    const ADD_PRODUCT_AVAILABILITY_URL: string = "http://localhost:8080/addAvailability";
    const headers = {
      headers : new HttpHeaders({
        "token": localStorage.getItem("username")
      })
    } 
    return this.http.post(ADD_PRODUCT_AVAILABILITY_URL, str, headers);
  }

  fetchProductAvailability(id: number) : Observable<any> {
    const FETCH_PRODUCT_AVAILABILITY_URL: string = "http://localhost:8080/availability/" + id;
    return this.http.get<String>(FETCH_PRODUCT_AVAILABILITY_URL);
  }

  updateProductAvailability(prodId: number, endDate: string) : Observable<any> {
    const UPDATE_PRODUCT_AVAILABILITY_URL: string = "http://localhost:8080/updateAvailability";
    const headers = {
      headers : new HttpHeaders({
        "token": localStorage.getItem("username")
      })
    } 
    let pA = new ProductAvailable(prodId, endDate);
    return this.http.put(UPDATE_PRODUCT_AVAILABILITY_URL, pA, headers);
  }

   addProductToCart(productId: number) : Observable<any> {
     const ADD_PRODUCT_TO_CART_URL: string = "http://localhost:8080/addToCart"
     const headers = {
       headers: new HttpHeaders({
         "token": localStorage.getItem("username")
       })
     }
     return this.http.post(ADD_PRODUCT_TO_CART_URL, productId, headers);
   }

   fetchProductsInCart(username: String) : Observable<any> {
     const FETCH_PRODUCTS_IN_CART_URL: string = "http://localhost:8080/displayProductsInCart";
     const headers = {
       headers: new HttpHeaders({
         "token": localStorage.getItem("username")
       })
     }
     return this.http.get<Product[]>(FETCH_PRODUCTS_IN_CART_URL, headers);
   }

   removeFromCart(productId: number) : Observable<any> {
     const REMOVE_FROM_CART_URL: string = "http://localhost:8080/removeFromCart";
     const headers = {
      headers: new HttpHeaders({
        "token": localStorage.getItem("username")
      })
    }
    return this.http.post(REMOVE_FROM_CART_URL, productId, headers);
   }

}