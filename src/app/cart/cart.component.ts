import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product';

export class CartElement {
  name: string
  price: number
  constructor(private prdname: string, private prdprice: number) {
    this.name = prdname;
    this.price = prdprice;
  }
}

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
  prodLength: number = 0;
  totalSum: number = 0;
  
  // For angular table: Left
  cartEle: CartElement[];
  columns: string[] = ['No', 'Product Name', 'Product Price'];

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
    this.products = null;
    this.productService.fetchProductsInCart(this.username).subscribe(
      data => {
        this.storeData(data)
      },
      error => {
        this.errorFunc(error)
      }
    )

    let tempUrl: string = "/cart/" + localStorage.getItem("username");
    this.route.navigate([tempUrl]);

  }

  storeData(data) {
    this.errorFlag = 0;
    this.products = data;
    this.prodLength = this.products.length;
    this.totalSum = 0;
    this.products.forEach(element => {
      this.totalSum = this.totalSum + element.price;
      // this.cartEle.push(new CartElement(element.name, element.price));
    });
  }

  errorFunc(error) {
    console.log("Error in fetching data!" + error)
    this.errorFlag = 1;
  }

  removeFromCart(event, product: Product) {
    this.productService.removeFromCart(product.id).subscribe(
      data => {
        console.log("Data: " + data);
        this.fetchProductsInCart();
      },
      error => console.log("Error in deletion!" + error)
    )
  }

  backToHome(event) {
    this.route.navigate(['dashboard/products/all']);
  }

  checkout(event) {
    // redirect to checkout
    this.route.navigate(['checkout']);
  }

}
