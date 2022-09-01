export class Cart {
  items ?: CartItem[];

}
export class CartItem {
  id?: string;
  quantity?: number;
  
}


export class CartItemDetails {
  product?: any;
  quantity?: number;
  
}