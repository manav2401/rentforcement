import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/product/product';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  products: Product[];
  daysAvailable: number[];
  errorFlag: number = 0;
  username: string;
  prodLength: number;
  totalSum: number = 0;
  allValidations: number = 0;
  fixedDeliveryCharge: number = 50;
  grandTotal: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {

    this.errorFlag = 0;

    const sessionUser = localStorage.getItem("username");
    if (sessionUser == null) {
      this.route.navigate(['login']);
    }

    // this.activatedRoute.params.forEach((params: Params) => {
    //   this.username = params['username'];
    //   if (this.username != sessionUser) {
    //     this.route.navigate(['login']);
    //   }
    // });

    this.username = localStorage.getItem("username");

    this.fetchProductsFromCart();

  }

  fetchProductsFromCart() {

    this.products = null;
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
    this.prodLength = this.products.length;
    this.totalSum = 0;
    let dt: Date = new Date();
    this.products.forEach(element => {
      let elementDate: Date = new Date(element.doa);
      this.daysAvailable.push((element.duration) - ((dt.getTime()-elementDate.getTime())/(3600*1000*24)));
      this.totalSum = this.totalSum + element.price;
      // this.cartEle.push(new CartElement(element.name, element.price));
    });
    this.grandTotal = this.totalSum + this.fixedDeliveryCharge;
  }

  errorFunc(error) {
    console.log("Error in fetching data!" + error)
    this.errorFlag = 1;
  }

  backToCart(event) {
    const cart_url = "cart"
    const url = `${cart_url}/${this.username}`
    this.route.navigate([url]);
  }

  placeOrder(event) {
    // logic here
  }


}
