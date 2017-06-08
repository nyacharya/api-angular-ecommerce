import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Product } from './product';

@Injectable()
export class ProductService {

   private baseUrl: string = "http://localhost:3000";
  
  constructor(private http: Http) { }

  getAll(): Observable<Product[]>{
      return this.http.get(`${this.baseUrl}/products`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response){
    let body = res.json();
    return body || [];
  }

  private handleError(error: any){
    console.log(error.message);
    let errMsg =  (error.message) ? error.message:
      error.status ? `${error.status} - ${error.statusText}` :  'Server error';
    if (errMsg)
      console.error(errMsg);
    return Observable.throw(errMsg);
  }

  create(product: Product): Observable<Response>{
    console.log(product);
      return this.http
        .post(`${this.baseUrl}/products/`, 
            product, 
            {headers: this.getHeaders()}).map((res: Response) => res.json());
    
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  delete(id: number): Observable<Response>{
        return this.http
        .delete(`${this.baseUrl}/products/${id}`, {headers: this.getHeaders()})
        .map(this.extractData)
        .catch(this.handleError);
  }

  edit(product: Product): Observable<Response>{
     return this.http
        .put(`${this.baseUrl}/products/${product.id}`,product, {headers: this.getHeaders()})
        .map(this.extractData)
        .catch(this.handleError);
  }

    get(id:number ): Observable<Product>{
      console.log(`${this.baseUrl}/products/${id}`);
        let people = this.http
        .get(`${this.baseUrl}/products/${id}`)
        .map(this.extractData)
        .catch(this.handleError);
        return people;

    }
}
