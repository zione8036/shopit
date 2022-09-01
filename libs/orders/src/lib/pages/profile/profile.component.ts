import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@bluebits/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cart } from '../../models/cart';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit, OnDestroy {


 constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService,
    private usersService: UsersService,private route: ActivatedRoute
  ) {}
  form: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId: string;
  unsubscribe$: Subject<any> = new Subject();
  order:Order[]=[];

  ngOnInit(): void {
this.usersService
      .observeCurrentUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        if (user) {
          this.userId = user.id;
          this.route.params.subscribe((params) => {
            this.userId ? this.getPending(this.userId)  : this.getPending();
          });
        }})
   
    this._initCheckoutForm();
    this._autoFillUserData()

  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
 
  getPending(filter?:string){
    console.log(filter)
    this.ordersService.getOrders(filter).subscribe(orders=>{
      this.order = orders;

    })

  }
   private _initCheckoutForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      street: ['',Validators.required],
      apartment: ['',Validators.required],
      barangay: ['',Validators.required],
      zip: ['',Validators.required],
      city: ['',Validators.required],
      region: ['',Validators.required]
    });
  }
 private _autoFillUserData() {
    this.usersService
      .observeCurrentUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        if (user) {
          this.userId = user.id;
          this.checkoutForm.name.setValue(user.name);
          this.checkoutForm.email.setValue(user.email);
          this.checkoutForm.street.setValue(user.street);
          this.checkoutForm.apartment.setValue(user.apartment);
          this.checkoutForm.barangay.setValue(user.barangay);
          this.checkoutForm.city.setValue(user.city);
          this.checkoutForm.zip.setValue(user.zip);
          this.checkoutForm.region.setValue(user.region);
        }
      });
  }
 



  back() {
    this.router.navigate(['/']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress: this.checkoutForm.street.value,
      shippingAddress1: this.checkoutForm.apartment.value,
      barangay: this.checkoutForm.barangay.value,
      city: this.checkoutForm.city.value,
      zip: this.checkoutForm.zip.value,
      region: this.checkoutForm.region.value,
      phone: this.checkoutForm.phone.value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`,
    };
    this.ordersService.createOrder(order).subscribe(
      () => {
        //redirect to thank you page // payment
        this.cartService.emptyCart();
        this.router.navigate(['/success']);
      },
      () => {
        //display some message to user
      }
    );
  }

  get checkoutForm() {
    return this.form.controls;
  }


}
