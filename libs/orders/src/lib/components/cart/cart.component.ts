import { Component, OnInit } from '@angular/core';
import { CartService } from '@bluebits/orders';

@Component({
  selector: 'orders-cart',
  templateUrl: './cart.component.html',
  styles: [
  ]
})
export class CartComponent implements OnInit {
count =0;
  constructor(private cartServ: CartService) { }

  ngOnInit(): void {
    this.cartServ.cart$.subscribe(cart=>{
      this.count=cart?.items?.length ?? 0;
    })
    
  }

}
