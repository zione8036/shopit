import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersModule } from '@bluebits/orders';
import { UiModule } from '@bluebits/ui';
import {CheckboxModule} from 'primeng/checkbox';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule, Routes } from '@angular/router';
import { FeaturedComponent } from './components/featured/featured.component';
import { ItemsComponent } from './components/items/items.component';
import { HotdealsComponent } from './components/hotdeals/hotdeals.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FormsModule } from '@angular/forms';
import {RatingModule} from 'primeng/rating';
import {InputNumberModule} from 'primeng/inputnumber';

 const routes : Routes=[
   {
     path: 'products',
     component:ProductListComponent
   },
   {
     path: 'category/:categoryid',
     component:ProductListComponent,
   },
   {
     path: 'products/:productid',
     component:ProductDetailsComponent,
   },
 ]
@NgModule({
  imports: [CommonModule, OrdersModule, FormsModule,InputNumberModule, RatingModule,CheckboxModule,UiModule, RouterModule.forChild(routes)],
  // eslint-disable-next-line max-len
  declarations: [ProductSearchComponent, CategoriesBannerComponent, FeaturedComponent, ItemsComponent, HotdealsComponent, ProductDetailsComponent, ProductListComponent],
  exports:[ProductSearchComponent, CategoriesBannerComponent, FeaturedComponent, ItemsComponent, HotdealsComponent]
})
export class ProductsModule {}
