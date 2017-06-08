import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService} from '../product.service';
import { Product } from '../product';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

products = new Product;
sub: any;

  constructor(private router: Router,
              private productservice: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.sub =  this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      console.log('getting product of id: ',id);

      this.productservice
      .get(id)
      .subscribe( p => this.products = p );
    });
    

  }
  editProduct(){
    this.productservice
    .edit(this.products)
    .subscribe(r => console.log("product edited "));
  }
  
  
}
