import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from "./product-list/product-list.component";
import { ProductDetailsComponent } from "./product-details/product-details.component"

const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }