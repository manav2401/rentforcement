import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product }from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url_list: string;
  url_details : string;
  url_add : string;
  url_upload : string;
  products: Product[];

  constructor( private http: HttpClient ) {  
  }

  getProductList(category: String){
    this.url_list = "http://localhost:8080/products";
    this.url_list = this.url_list + "/" + category;
    return this.http.get<Product[]>(this.url_list);
  }

  getProductDetails(id: number){
    this.url_details = "http://localhost:8080/product";
    this.url_details = this.url_details + "/" + id;
    console.log(this.url_details);
    //this.http.get<Product>(this.url_details).subscribe((data) => {console.log(data) })
    return this.http.get<Product>(this.url_details);
  }



  addNewProduct(file: File, product: Product): void{

    this.addProduct(product).subscribe(
      data => console.log("Product added: " + data),
      error => console.log("Error: " + error)
    )
    // this.addProduct(product).subscribe(data => { 
    //   this.uploadImage(file, data).subscribe(data => {
    //     this.displayImageUploadDataInConsole(data);
    //   } )});

  }

  displayImageUploadDataInConsole(data: any){
    console.log(data);
  }
  addProduct(product: Product): Observable<any>{
    console.log("Service " + product.name);
    this.url_add = "http://localhost:8080/addProduct";
    const headers = {
      headers : new HttpHeaders({
        "token": "manav_2401"
      })
    }  
    console.log("About to fire post query on " + this.url_add);
    return this.http.post(this.url_add, product, headers);
  }

  uploadImage(file: File, productId: number): Observable<any>{

    this.url_upload = "http://localhost:8080/image/upload";
    const formData: FormData = new FormData();
    formData.append('file', file);
    console.log("Into Image Service");

    const headers = {
      headers : new HttpHeaders({
        "productId": String(productId)
      })
    } 
    return this.http.post(this.url_upload, formData);
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
}