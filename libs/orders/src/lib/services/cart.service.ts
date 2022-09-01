import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
   cart$ : BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());
  initCartStorage(){
    const cart:Cart = this.getCart();
    if(!cart){
      const initCart ={
      items: []
    };
    const initialCartJSON = JSON.stringify(initCart)
    localStorage.setItem(CART_KEY,initialCartJSON)
    }
    
    
  }
 
  getCart():Cart{
    const cartJSON : string = localStorage.getItem(CART_KEY) ;
    const cart : Cart = JSON.parse(cartJSON);
    return cart;
  }
  addToCart(item:CartItem, update?:boolean):Cart{
    const cart = this.getCart();
    const itemExist = cart.items.find((product)=>product.id ===item.id);
    if(itemExist){
      cart.items.map(product=>{
        if(product.id===item.id){
          if(update){
            product.quantity = item.quantity;
          }else{
            product.quantity = product.quantity+item.quantity;
          }
          
          return product;
        }
      })
    }else{
    cart?.items?.push(item);
    }
    
    const cartJSON = JSON.stringify(cart)
    localStorage.setItem(CART_KEY,cartJSON)

    this.cart$.next(cart);
    return cart;
  }
 emptyCart() {
    const intialCart = {
      items: []
    };
    const intialCartJson = JSON.stringify(intialCart);
    localStorage.setItem(CART_KEY, intialCartJson);
    this.cart$.next(intialCart);
  }


  deleteCartItem(productid: string){
    const cart = this.getCart();
    const newItems = cart.items.filter((item)=>item.id !== productid);
    cart.items =newItems;
    const cartJsonString = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJsonString);
     this.cart$.next(cart);
  }
}
