import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { order }from './order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
    constructor (private http: HttpClient) {}
    ADD_NEW_ORDER_URL: string = "http://localhost:8080/addOrder";

    addNewOrder(currOrder : order) : Observable<any> {
        const headers = {
            headers : new HttpHeaders({
              "token": localStorage.getItem("username")
            })
          }
          return this.http.post(this.ADD_NEW_ORDER_URL, currOrder, headers);
    }

    emptyUserCart() : Observable<any> {
      const EMPTY_CART_URL: string = "http://localhost:8080/emptyCart"
      const headers = {
        headers : new HttpHeaders({
          "token": localStorage.getItem("username")
        })
      }
      return this.http.delete(EMPTY_CART_URL, headers);
    }
}