import { Component, OnInit } from '@angular/core';
import { user } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  usr = new user();
  flag = new Array(6);
  token: string = null;
  displayMessage: string;

  constructor(private userService: UserService, private router: Router) { 

    this.usr.userid = "1";
    this.usr.fname = null;
    this.usr.lname = null;
    this.usr.username = null;
    this.usr.emailaddr= null;
    this.usr.phone = null;
    this.usr.password = null;

    for (var i=0; i<6; i++) {
      this.flag[i]=1;
    }
    
  }

  ngOnInit(): void {
  }

  saveUserDetails(event, usr: user) {

    if (usr.fname == null || usr.fname == "") {
      this.flag[0] = 0;
    } else {
      this.flag[0] = 1;
    }

    if (usr.lname == null || usr.lname == "") {
      this.flag[1] = 0;
    } else {
      this.flag[1] = 1;
    }

    if (usr.username == null || usr.username == "") {
      this.flag[2] = 0;
    } else {
      this.flag[2] = 1;
    }

    if (usr.emailaddr == null || usr.emailaddr == "") {
      this.flag[3] = 0;
    } else {
      this.flag[3] = 1;
    }

    if (usr.phone == null || usr.phone == "") {
      this.flag[4] = 0;
    } else {
      this.flag[4] = 1;
    }

    if (usr.password == null || usr.password == "") {
      this.flag[5] = 0;
    } else {
      this.flag[5] = 1;
    }

    var sum = 0;
    for (var i=0; i<6; i++) {
      sum += this.flag[i];
    }

    if (sum==6) {
      console.log("AC");
      this.userService.addUser(usr).subscribe(
        data => {
          this.storeToken(data, usr.username);
        },
        error => console.log("Error: ", error),
      )
    }

  }

  storeToken(data, username) {

    if (data=="Added") {
      localStorage.setItem("username", data);
      this.displayMessage = null;
      this.router.navigate(['dashboard/products/all']);
    } else {
      this.displayMessage = data;
    }

  }

}
