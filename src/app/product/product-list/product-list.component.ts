import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Router } from '@angular/router';
import { ProductVisual } from '../productVisual';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges {

  @Input() category: String;
  @Input() toggle: boolean;
  products: Array<Product>;
  packets: Array<ProductVisual>

  cUrl: string;
  arr: string[];
  // toggle: string;

  constructor( private prodService: ProductService, 
    private router: Router, 
    private imageService : ImageService) { 
    this.category = "all"; 
  }

  ngOnChanges(changes: SimpleChanges){
    this.getProductList();
  }

  ngOnInit(): void {
    this.getProductList();
    this.cUrl = this.router.url;
    this.arr = this.cUrl.split("/",5);
    // this.toggle = this.arr[4];
    console.log("TOGGLE: " + this.toggle);
  }  

  getProductList(): void {


    this.prodService.getProductListWithImages(this.category, this.toggle).subscribe(data => { this.packets = data});
  }


  goToDetailsPage(product: Product){
    this.prodService.product = product;
    this.router.navigate(['/dashboard/product/',product.id]);
  }

  checkToggle() {
    
  }

}
