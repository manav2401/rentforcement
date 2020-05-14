import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

import { UserLogin } from '../UserLogin';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin = new UserLogin();
  flag1 = 0;
  flag2 = 0;
  loginFailed: number = 0;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userLogin.credential = null;
    this.userLogin.password = null;
  }

  sendLoginCredentials(event, username, password) {
    if (username==null || username=="") {
      this.flag1=1;
    } else {
      this.flag1=0;
    }

    if (password==null || password=="") {
      this.flag2=1;
    } else {
      this.flag2=0;
    }

    if (this.flag1==0 && this.flag2==0) {
      console.log("Data Received: " + this.userLogin.credential + " and " + this.userLogin.password);
      this.validateCredentials();
    }

  }

  validateCredentials() {
    this.userService.sendLoginCredentials(this.userLogin).subscribe(
      data => {
        this.storeToken(this.userLogin.credential, data);
      },
      error => {
        this.error(error);
      }
    )
  }

  error(err) {
    console.log("Error in login: " + err);
    this.loginFailed = 1;
  }

  storeToken(token, data: boolean) {
    if (data==true) {
      this.loginFailed = 0;
      localStorage.setItem("username", token);
      this.router.navigate(['dashboard/products/all']);      
    } else {
      this.loginFailed = 1;
    }
  }


}
