import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CartItemDetails, CartService, OrdersService } from '@bluebits/orders';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit, OnDestroy {
  items : CartItemDetails[]=[];
    totalPrice: number;
  isCheckout = false;
  count= 0;
  endsubs$ :Subject<any>=new Subject()

  constructor(private location: Location, private cartServ : CartService, private orderServ: OrdersService, private router: Router,) { }

  ngOnInit(): void {
    this.getCartDetails();
    this._getOrderSummary();
  }
  ngOnDestroy(){
    this.endsubs$.next()
this.endsubs$.complete()
  }
  private getCartDetails(){
    this.cartServ.cart$.pipe(takeUntil(this.endsubs$)).subscribe(cart =>{
      this.items =[];
      this.count=cart?.items?.length ?? 0;
      cart.items.forEach(item=>{
        this.orderServ.getProduct(item.id).subscribe((productItem)=>{
          this.items.push({
            product: productItem,
            quantity: item.quantity
          })
        })
      })
    })
  }
  _getOrderSummary(){
    this.cartServ.cart$.pipe(takeUntil(this.endsubs$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items.map((item) => {
          this.orderServ
            .getProduct(item.id)
            .pipe(take(1))
            .subscribe((product) => {
              this.totalPrice += product.price * item.quantity;
            });
        });
      }
    });
  }
  back(){
    this.location.back();
  }
  navigateToCheckout(){
    this.router.navigate(['/checkout']);
  }
  
    deleteCartItem(cartItem: CartItemDetails) {
   
    this.cartServ.deleteCartItem(cartItem.product.id);
  }


  updateQuantity(event, cartItem:CartItemDetails){
    this.cartServ.addToCart({
      id:cartItem.product.id,
      quantity:event.value
    }, true)
  }

}
