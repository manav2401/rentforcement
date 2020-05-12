import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    URL_OPEN = "http://localhost/4501/open";
    URL_REST = "http://localhost/4501/rest"

    constructor(private http: HttpClient) { }

    openPostRequest(obj) : Observable<any> {
      return this.http.post(this.URL_OPEN, obj);
    }

    userPostRequest(obj) : Observable<any> {
      const headers = {
        headers: new HttpHeaders({
          "token": localStorage.getItem("username")
        })
      }
      return this.http.post(this.URL_REST, obj, headers);
    }

}