import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';
import { ProductVisual } from './productVisual';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor( private http: HttpClient ) { }

  url_imageUpload: string = "http://localhost:8080/image/upload";
  url_imageList: string = "http://localhost:8080/image";


  uploadLoadImage(file: File, productId: number): Observable<any>{


    let formData = new FormData();
    formData.append('file', file);

    const headers = {
      headers : new HttpHeaders({
        "productId": String(productId)
      })  
    }
    
    return this.http.post(this.url_imageUpload, formData, headers);
    
  }

}
