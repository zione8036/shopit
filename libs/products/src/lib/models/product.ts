import { Category } from './category';

export class Product {
 
  id?: string;
  name?: string;
  short_description?: string;
  long_description?: string;
  image?: string;
  gallery?: string[];
  brand?: string;
  price?: number;
  category?: Category;
  countInStock?: number;
  rating?: number;
  numReviews?: number;
  isFeatured?: boolean;
  isHotDeals?: boolean;
  dateCreated?: string;
}
