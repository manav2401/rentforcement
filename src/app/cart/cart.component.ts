import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) { }

  username: string;

  ngOnInit(): void {

    const sessionUser = localStorage.getItem("username");
    if (sessionUser == null) {
      this.route.navigate(['login']);
    }

    this.activatedRoute.params.forEach((params: Params) => {
      this.username = params['username'];
      if (this.username != sessionUser) {
        this.route.navigate(['login']);
      }
    });

  }

  backToHome(event) {
    this.route.navigate(['dashboard']);
  }

  checkout(event) {
    // redirect to checkout
  }

}
