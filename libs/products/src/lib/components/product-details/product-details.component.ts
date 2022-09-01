import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { Subject } from 'rxjs';
import { CartItem, CartService } from '@bluebits/orders';

@Component({
  selector: 'products-detail',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product:Product;
  endsubs$ :Subject<any>=new Subject()
quantity=1;
  constructor(private productService : ProductsService, private route : ActivatedRoute, private cartServ: CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      if(params.productid){
        this.getProduct(params.productid)
      }
    })
  }
  ngOnDestroy(){
    this.endsubs$.next()
this.endsubs$.complete()
  }
 getProduct(id:string){
   this.productService.getProduct(id).pipe(takeUntil(this.endsubs$)).subscribe(products =>{
     this.product=products
   })
 }
 addToCart(){
   const setItem: CartItem = {
      id:this.product.id,
      quantity:this.quantity
    }

    this.cartServ.addToCart(setItem);
 }
}
