import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'products-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
products:Product[]=[];
cetgories:Category[]=[];
isCategoryPage:boolean;
  constructor(private productService: ProductsService, private catService : CategoriesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
     this.route.params.subscribe((params) => {
       console.log(params.categoryid)
      params.categoryid ? this.getProducts([params.categoryid]) : this.getProducts();
      params.categoryid ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
    });
    
    this.getCategory()
  }
  getProducts(filter?:string[]){
    this.productService.getProducts(filter).subscribe(product=>{
      this.products = product;
      
    })
  }
  getCategory(){
    this.catService.getCategories().subscribe(category=>{
      this.cetgories = category;
    })
  }
  categoryFilter(){
    const selectedCategories = this.cetgories
      .filter((category) => category.checked)
      .map((category) => category.id);

    this.getProducts(selectedCategories);
  }
}
