import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-stocks',
  templateUrl: './stocks.component.html',
  styles: [
  ]
})
export class StocksComponent implements OnInit, OnDestroy {
  products = [];
 endsubs$ :Subject<any>=new Subject()
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  ngOnDestroy(){
    this.endsubs$.next()
this.endsubs$.complete()
  }

  private _getProducts() {
    this.productsService.getProducts().pipe(takeUntil(this.endsubs$)).subscribe((products) => {
      this.products = products;
    });
  }


}
