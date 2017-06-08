import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from '../product.service'
import { Product } from '../product';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
 
   products: Product[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;
 
  constructor(private productservice: ProductService)
            {}
  ngOnInit() {
    // console.log(this.products);
    this.productservice
    .getAll()
    .subscribe(
      p => this.products = p,
      e => this.errorMessage,
      () => this.isLoading =false);
      // console.log(this.products);
    
  }
  product = new Product();
  public xyz:any;
  
  
 

  createProduct(){
    
    console.log(this.product);
    this.productservice
    .create(this.product)
    .subscribe(r=>{
      console.log('product added')
      this.xyz = r;
      this.product.id = this.xyz.id;
      this.products.push(this.product);
    });
    
  }

    deleteProduct(product: Product, index: number){

    this.productservice
    .delete(product.id)
    .subscribe(r => {
      this.products.splice (index, 1);
    });
  }

  

}



