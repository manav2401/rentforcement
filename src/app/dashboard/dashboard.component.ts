import { Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { order } from '../cart/order';
import { DashboardService } from './dashboard.service';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //Selecttion Attributes
  currentUrl: String;
  arr: String[];
  selector: number;

  // User Session
  session: number = 0;
  user: boolean;
  currUser: string;

  // Orders
  orders: order[];
  ordersFetched: number = 0;

  //Child Data Requirements attributes
  category: String;
  id: number;

  // Toggle
  toggle: boolean;

  navigationSubscription: any;

  constructor(private route: Router,
    private dashboardService: DashboardService,
    private productService: ProductService
    ) {
    this.selector = 1;
    
    this.navigationSubscription = this.route.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.selectDashboard();
      }
    });


   }

  ngOnInit(): void {

    this.ordersFetched = 0;
    let currentUser: string = null;
    currentUser = localStorage.getItem("username");
    console.log("fetching username: " + currentUser);

    if (currentUser==null) {
      this.session = 0;
    } else {
      this.session = 1;
      this.currUser = currentUser;
    }
  }


  selectDashboard(): void{
    this.currentUrl = this.route.url;
    this.arr = this.currentUrl.split("/",5);
    if(this.arr[2] == "products"){
      this.selector = 1;
      console.log("DashBoard Selector: " + this.selector + " Catgory: " + this.arr[3]);
      this.category = this.arr[3];
      if(this.arr[4] == "u"){
        this.toggle = true;
      }
      else{
        this.toggle = false;
      }
      this.selector = 1;
    }
    else if(this.arr[2] == "product"){
      this.selector = 2;
      console.log("Dashboard Selector: " + this.selector);
      this.id = Number(this.arr[3]);
    }

    else if(this.arr[2] == "addProduct"){
      this.selector = 3;
      console.log("Dashboard Selector: " + this.selector);
    }
    else if(this.arr[2] == "updateProduct"){
      //Update Product
      this.selector = 4;
      console.log("Dashboard Selector: " + this.selector);
      this.id = Number(this.arr[3]);
    }

  }

  // updateProductListByCategory(category: String){
  //   this.currentUrl = "/dashboard/products/" + category;
  //   this.route.navigate([this.currentUrl]);
  // }

  fetchOrders() {

    console.log("In function!");
    if (this.session==0) {
      this.route.navigate(['login']);
    } else {
      this.session = 1;
      this.route.navigate(["/orders"]);
    }

  }

  fetchCart() {
    if (this.session==0) {
      this.route.navigate(['login']);
    } else {
      let temp: string = "/cart/" + localStorage.getItem("username");
      this.route.navigate([temp]);
    }
  }


  goToAddProduct(): void{
    if (this.session==0) {
      this.route.navigate(['login'])
    } else {
      this.route.navigate(["/dashboard/addProduct"]);
    }
  }

  goToListByCategory( num : any ): void{
    // console.log("Function called");
    
    if(num == 1){
      //this.selector = 2;
      this.route.navigate(['/dashboard/products/', 'all']);
    }
    else if(num == 2){
      
      this.route.navigate(['/dashboard/products/', 'Clothes']);
    }
    else if(num == 3){
      
      this.route.navigate(['/dashboard/products/', 'Electronics']);
    }
    else if(num == 4){
      
      this.route.navigate(['/dashboard/products/', 'Household']);
    }
    else if(num == 5){
      
      this.route.navigate(['/dashboard/products/', 'Games']);
    }
    else if(num == 6){
      
      this.route.navigate(['/dashboard/products/', 'Industrial']);
    } 
    else if (num == 7) {
      this.route.navigate(['/dashboard/products/', 'Books']);
    }
    else if(num == 8){
      
      this.route.navigate(['/dashboard/products/', 'Other']);
    }
    
  }

  // displayToggle(value: any){
  //   console.log("Toogled: value = " + !this.user);
  //   if (!this.user == true) {
  //     localStorage.setItem("toggle", "1");
  //     let temp: string = 'dashboard/products/' + this.category + "/u";
  //     this.route.navigate([temp]);
  //   } else {
  //     this.route.navigate(["/dashboard/products/", this.category]);
  //   }
    
  // }

  displayToggle(value: any){
    console.log("Toogled: value = " + !this.toggle);

    let url: string;
    if(!this.toggle){
      url = "/dashboard/products/" + this.category + "/u";
      this.route.navigate([url]);
    }
    else{
      url = "/dashboard/products/" + this.category;
      this.route.navigate([url]);
    }
  }

  closeSession(event) {
    localStorage.removeItem("username");
    console.log("WHILE LOGOUT: " + localStorage.getItem("username"));
    this.session = 0;
    this.route.navigate(['/dashboard/products/all']);
  }

}
