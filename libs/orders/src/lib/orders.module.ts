import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { CartComponent } from './components/cart/cart.component';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import {InputNumberModule} from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SummaryComponent } from './components/summary/summary.component';
import {InputMaskModule} from 'primeng/inputmask';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import { AfterCheckoutComponent } from './components/after-checkout/after-checkout.component';
import { AuthGuard } from '@bluebits/users';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes=[{
  path:'cart',
  component:CartPageComponent
},
{
  path:'profile/:userid',
  component:ProfileComponent
},
{
  path:'checkout',
  canActivate: [AuthGuard],
  component:CheckoutComponent
},{
  path:'success',
  component:AfterCheckoutComponent
}]
@NgModule({
  // eslint-disable-next-line max-len
  imports: [CommonModule, RouterModule.forChild(routes), InputNumberModule, FormsModule, ReactiveFormsModule,InputMaskModule,ButtonModule,CardModule ],
  declarations: [CartComponent, CartPageComponent, CheckoutComponent, SummaryComponent, AfterCheckoutComponent, ProfileComponent],
  exports: [CartComponent, CartPageComponent, CheckoutComponent, SummaryComponent, AfterCheckoutComponent, ProfileComponent],
})
export class OrdersModule {
  constructor(cartService:CartService){
    cartService.initCartStorage();
  }
}
