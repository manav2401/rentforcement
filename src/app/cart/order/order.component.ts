import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/product/product';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product/product.service';
import { order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  // user and product
  username: string;
  products: Product[];
  prodLength: number;
  endDates;
  productAmount;

  // flags
  errorFlag: number = 0;  
  allValidations: number = 0;

  // amounts
  totalSum: number = 0;
  fixedDeliveryCharge: number = 50;
  grandTotal: number = 0;

  // dates
  startDate: Date;
  minDate: Date;
  maxDate: Date[];

  // order
  ord: order;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private productService: ProductService,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {

    // add 1 day to min date;
    let time: number = (new Date()).getTime() + 1*24*3600*1000;
    this.minDate = new Date(time);
    this.startDate = this.minDate;

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
    this.endDates = new Array<Date>(this.prodLength);
    this.maxDate = new Array<Date>(this.prodLength);
    this.productAmount = new Array<number>(this.prodLength);
    this.totalSum = 0;
    let count = 0;
    this.products.forEach(element => {
      let dt: Date = new Date(element.doa);
      let time: number = 0;
      time = dt.getTime() + element.duration * 24 * 3600 * 1000;      
      // this.totalSum = this.totalSum + element.price;
      this.maxDate[count] = new Date(time);
      count = count+1;
    });
    // this.grandTotal = this.totalSum + this.fixedDeliveryCharge;
  }

  errorFunc(error) {
    console.log("Error in fetching data!" + error)
    this.errorFlag = 1;
  }

  dateInput(event, index) {
    // add end date to final array
    this.endDates[index] = event.value;
    this.productAmount[index] = this.calculateTotalAmount(index);
    if (index==(this.prodLength-1)) {
      this.productAmount.forEach(element => {
        this.totalSum = this.totalSum + element;
      });
      this.grandTotal = this.totalSum + this.fixedDeliveryCharge;
      this.allValidations = 1;
    }
  }

  calculateTotalAmount(index): number {
    let days: number = 0;
    let date: Date = this.endDates[index];
    let currDate: Date = new Date();
    currDate.setHours(0);
    currDate.setMinutes(0);
    currDate.setSeconds(0);
    days = date.getTime() - currDate.getTime();
    days = Math.round(days / (1000 * 3600 * 24));
    return days*this.products[index].price;
  }

  backToCart(event) {
    const cart_url = "cart"
    const url = `${cart_url}/${this.username}`
    this.route.navigate([url]);
  }

  placeOrder(event) {

    // API Call for order of each product
    let count: number = 0;
    this.products.forEach(element => {

      // API Call for order
      this.ord = new order();
      this.ord.id = 1;
      this.ord.userid = 1;
      this.ord.prodid = element.id;
      // console.log("PRODUCT ID " + this.ord.prodid);
      this.ord.startDate = new Date().toDateString();
      this.ord.endDate = this.endDates[count].toDateString();
      this.ord.amount = this.productAmount[count];
      this.ord.userAddress = "Address";
      this.ord.orderStatus = "Placed";
      this.orderService.addNewOrder(this.ord).subscribe(
        data => console.log("Order Placed product:" + count + ": " + data),
        error => console.log("Error in placing order for product: " + count + ": " + error)
      )

      // API Call for Updating Availability
      this.productService.updateProductAvailability(this.ord.prodid, this.ord.endDate).subscribe(
        data => console.log("Product Availability Updated!"),
        error => console.log("Error in updating product availability!" + error)
      )

      count = count+1;
    });
    console.log("All the orders have been placed!");
    
    // empty the user cart
    this.orderService.emptyUserCart().subscribe(
      data => console.log("User Cart Empty!"),
      error => console.log("Error in emptying user cart!" + error)
    )

    // navigate to orders section
    this.route.navigate(['orders'])
  }

}
