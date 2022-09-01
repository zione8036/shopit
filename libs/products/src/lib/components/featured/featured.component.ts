import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-featured-banner',
  templateUrl: './featured.component.html'
})
export class FeaturedComponent implements OnInit {
products:Product[]=[];
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getFeatured()
    
  }
  getFeatured(){
    this.productService.getFeatured(4).subscribe(product=>{
     
      this.products = product;
   
    })
  }

}
