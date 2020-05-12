import { Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUrl: String;
  arr: String[];
  selector: number;


  category: String;
  id: number;

  navigationSubscription: any;

  constructor(private route: Router) {
    this.selector = 0;
    this.navigationSubscription = this.route.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.selectDashboard();
      }
    });


   }

  ngOnInit(): void {
  }


  selectDashboard(): void{
    this.currentUrl = this.route.url;
    this.arr = this.currentUrl.split("/",5);
    if(this.arr[2] == "products"){
      this.selector = 1;
      console.log("DashBoard Selector: " + this.selector + " Catgory: " + this.arr[3]);
      this.category = this.arr[3];
    }
    else if(this.arr[2] == "product"){
      this.selector = 2;
      console.log("Dashboard Selector: " + this.selector);
    }

    else if(this.arr[2] == "addProduct"){
      this.selector = 3;
      console.log("Dashboard Selector: " + this.selector);
    }
  }

  // updateProductListByCategory(category: String){
  //   this.currentUrl = "/dashboard/products/" + category;
  //   this.route.navigate([this.currentUrl]);
  // }


  goToAddProduct(): void{
    this.route.navigate(["/dashboard/addProduct"]);
  }

  goToListByCategory( num : any ): void{
    console.log("Function called");
    
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
    else if(num == 7){
      
      this.route.navigate(['/dashboard/products/', 'Other']);
    }
    
  }

}
