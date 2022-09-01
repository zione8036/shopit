import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-hotdeals-banner',
  templateUrl: './hotdeals.component.html'
})
export class HotdealsComponent implements OnInit {
 hotDeals:Product[]=[];
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getHotdeals()
  }
  getHotdeals(){
    this.productService.getHotDeal().subscribe(product=>{
     
      this.hotDeals=product;
      
    })
  }

}
