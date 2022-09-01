import { Component,  OnInit ,Input} from '@angular/core';
import { CartService, CartItem } from '@bluebits/orders';

import { Product } from '../../models/product';

@Component({
  selector: 'products-item',
  templateUrl: './items.component.html'
})
export class ItemsComponent implements OnInit {
 @Input() product: Product;

  constructor(private cartServ: CartService) {}

  ngOnInit(): void {
    
  }
  addToCart(){
    const setItem: CartItem = {
      id:this.product.id,
      quantity:1,
    }
    
    this.cartServ.addToCart(setItem);
  }
}
