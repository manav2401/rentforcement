import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from './user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserLogin } from './UserLogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    ADD_NEW_USER_URL:string = "http://localhost:8080/addUser";
    SEND_LOGIN_CREDENTIALS = "http://localhost:8080/signin"

    constructor(private http: HttpClient) { }

    addUser(usr: user) : Observable<any> {
        return this.http.post(this.ADD_NEW_USER_URL, usr);
    }

    sendLoginCredentials(userLogin: UserLogin) : Observable<any> {
        return this.http.post(this.SEND_LOGIN_CREDENTIALS, userLogin);
    }

//   fetchEmployees() : Observable<any>{
//     return this.http.get<employee[]>(this.FETCH_ALL_EMPLOYEES_URL);
//   }

//   fetchEmployee(id: string) : Observable<any> {
//     const FETCH_URL: string = "http://localhost:4501/employee/" + id;
//     return this.http.get(FETCH_URL);
//   }

//   updateEmployee(emp: employee): Observable<any> {
//     const UPDATE_URL: string = "http://localhost:4501/updateEmployee/" + emp.emp_id;
//       return this.http.put(UPDATE_URL, emp);
//   }

}