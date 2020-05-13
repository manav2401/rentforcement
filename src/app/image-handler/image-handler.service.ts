import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageHandlerService {


  uploadUrl: string = "http://localhost:8080/image/upload";

  constructor( private http: HttpClient ) { 

   }

   //Takes Array of Files as input
   uploadImage(files: Array<File>): Observable<any>{
    //const formData: FormData = new FormData();
    //formData.append('file', JSON.stringify(files));
    console.log("Into Service");

    //Setting headers
    //Hard-coding as of now
    const headers = {
      headers : new HttpHeaders({
        "productId": String(10)
      })  
    } 
    //Post request to backend
    return this.http.post(this.uploadUrl, files, headers);
   }
   
   

   

}
