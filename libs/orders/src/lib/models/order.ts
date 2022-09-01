import { OrderItem } from './order-item';
import { User } from '@bluebits/users';

export class Order {
  id?: string;
  orderItems?: OrderItem[];
  shippingAddress?: string;
  shippingAddress1?: string;
  barangay?: string;
  city?: string;
  zip?: string;
  region?: string;
  phone?: string;
  status?: number;
  totalPrice?: number;
  user?: any;
  dateOrdered?: string;
}
