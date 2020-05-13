import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { order } from '../cart/order';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  FETCH_ORDERS_URL: string = "http://localhost:8080/orders";

  constructor(private http: HttpClient) {}

  fetchOrders() : Observable<any> {
    const headers = {
      headers : new HttpHeaders({
        "token": localStorage.getItem("username")
      })
    }
    return this.http.get<order[]>(this.FETCH_ORDERS_URL, headers);
  }

}