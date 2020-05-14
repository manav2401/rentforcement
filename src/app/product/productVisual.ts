import { Product } from './product';

export class ProductVisual {
    product: Product;
    image: String;

    constructor(product: Product, image: String){
        this.image = image;
        this.product = product;
        
    }    
    
}
