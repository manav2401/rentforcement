import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { delay } from 'rxjs/operators';
import { ProductVisual } from '../productVisual';

@Component({
  selector: 'app-product-updation',
  templateUrl: './product-updation.component.html',
  styleUrls: ['./product-updation.component.css']
})
export class ProductUpdationComponent implements OnInit {


  selector: number;

  @Input() id: number;

  productImage: ProductVisual;

  constructor( private productService : ProductService,
    private router: Router) { }




  ngOnInit(): void {
    this.selector = 1;
    this.getProductDetails(this?.id);
  }

  getProductDetails(id: number){
    this.productService.getProductDetailsWithImage(id).subscribe(data => {this.setProductData(data)})
  }


  setProductData(data: any){
    this.productImage = data;
    console.log("Parent Updation ");
    console.log(data );
    this.productService.product = data.product;
  }

  updateProduct( product: Product ){
    this.productService.updateProduct(product).subscribe(data => { this?.displayAndRedirect(data)} )

  }

  displayAndRedirect( data: any ){
    delay(500);
    window.alert(data);
    this.router.navigate(['/dashboard/products/','all']);
  }

}
