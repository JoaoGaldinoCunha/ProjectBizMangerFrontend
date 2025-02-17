import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private httpClient:HttpClient, private cookieService:CookieService ) {}

  private readonly ApiSearchProductsMostOrdered=`http://localhost:8080/product/searchProductsMostOrdered/`
  private readonly ApiSearchProductsWithLowQuantity=`http://localhost:8080/product/searchProductsWithLowQuantity/`

   LoadDataMostOrdered(){
    const companyId = this.cookieService.get('companyId');
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });    return this.httpClient.get(this.ApiSearchProductsMostOrdered+companyId,{headers});
  }

  LoadDataLowQuantity(){
    const companyId = this.cookieService.get('companyId');
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });    return this.httpClient.get(this.ApiSearchProductsWithLowQuantity+companyId,{headers});
  }

}
