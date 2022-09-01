import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiURLOrders = environment.apiUrl + 'orders';
   apiURLProducts = environment.apiUrl + 'products';

  getProduct(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURLProducts}/${productId}`);
  }

  constructor(private http: HttpClient) {}
  //  getProducts(categoriesFilter?: string[]): Observable<Product[]> {
//     let params = new HttpParams();
//     if (categoriesFilter) {
//       params = params.append('categories', categoriesFilter.join(','));
      
//     }
//     return this.http.get<Product[]>(this.apiURLProducts, { params: params });
//   }

  getOrders(filter?: string): Observable<Order[]> {
    let params = new HttpParams();
     if (filter) {
     params= params.set('users', filter);
          
    }
    console.log(`${this.apiURLOrders}?${params}`)
    return this.http.get<Order[]>(`${this.apiURLOrders}?${params}`);
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiURLOrders, order);
  }

  updateOrder(orderStaus: { status: string }, orderId: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiURLOrders}/${orderId}`, orderStaus);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLOrders}/${orderId}`);
  }
  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLOrders}/get/count`)
      .pipe(map((objectValue: any) => objectValue.orderCount));
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLOrders}/get/totalsales`)
      .pipe(map((objectValue: any) => objectValue.totalsales));
  }
}
