import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { AuthGuard } from '@bluebits/users';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { StocksComponent } from './pages/products/stocks/stocks.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'categories',
        component: CategoriesListComponent
      },
      {
        path: 'categories/form',
        component: CategoriesFormComponent
      },
      {
        path: 'categories/form/:id',
        component: CategoriesFormComponent
      },
      {
        path: 'products',
        component: ProductsListComponent
      },
      {
        path: 'products/form',
        component: ProductsFormComponent
      },
      {
        path: 'products/form/:id',
        component: ProductsFormComponent
      },
      {
        path: 'stocks',
        component: StocksComponent
      },
      {
        path: 'users',
        component: UsersListComponent
      },
      {
        path: 'users/form',
        component: UsersFormComponent
      },
      {
        path: 'users/form/:id',
        component: UsersFormComponent
      },
      {
        path: 'orders',
        component: OrdersListComponent
      },
      {
        path: 'order/details/:id',
        component: OrdersDetailComponent
      }
    ]
  },{
    path: '',
    redirectTo:'dashboard',
    pathMatch:'full'
  }
  
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
      RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
  ],exports:[RouterModule]
})
export class AppRoutingModule {
  
 }
