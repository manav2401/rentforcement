import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private productService: ProductService
  ) { }

  username: string;
  products: Product[];
  errorFlag: number;

  ngOnInit(): void {

    this.errorFlag = 0;

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

    this.fetchProductsInCart();

  }

  fetchProductsInCart() {
    this.productService.fetchProductsInCart(this.username).subscribe(
      data => {
        this.storeData(data)
      },
      error => {
        this.errorFunc(error)
      }
    )
  }

  storeData(data) {
    this.errorFlag = 0;
    this.products = data;
  }

  errorFunc(error) {
    console.log("Error in fetching data!" + error)
    this.errorFlag = 1;
  }

  backToHome(event) {
    this.route.navigate(['dashboard']);
  }

  checkout(event) {
    // redirect to checkout
  }

}
