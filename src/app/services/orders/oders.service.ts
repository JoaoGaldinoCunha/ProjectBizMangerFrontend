import { HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrderRequest } from '../../models/order-request';
import { OrderUpdateRequest } from '../../models/order-update-request';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly ApiLoadAllOrders = `http://localhost:8080/order/allOrders/`;
  private readonly ApiCreateOders = `http://localhost:8080/order/create`;
  private readonly ApiAllDataOderById = `http://localhost:8080/order/odersById/`;
  private readonly ApiUpdateOrder = `http://localhost:8080/order/update/`;
  private readonly ApiodersByIdCompanyAndOrder = `http://localhost:8080/order/odersByIdCompanyAndOrder/`;
  private readonly ApiDeleteOrderById=`http://localhost:8080/order/delete/`

  constructor(private cookieService: CookieService, private httpClient: HttpClient) { }

  LoadDataAllOrdersInCompany(): Observable<any> {
    const token = this.cookieService.get('accessToken');
    const companyId = this.cookieService.get('companyId');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(`${this.ApiLoadAllOrders}${companyId}`, { headers });
  }

  LoadDataOderById(orderId: number): Observable<any> {
    const token = this.cookieService.get('accessToken');
    const companyId = this.cookieService.get('companyId');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(`${this.ApiAllDataOderById}${orderId}/${companyId}`, { headers });
  }

  LoadDataOderByIdCompanyAndOrder(companyId: number, orderId: number): Observable<any> {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(`${this.ApiodersByIdCompanyAndOrder}${companyId}/${orderId}`, { headers });
  }

  createOrder(productData: OrderRequest): Observable<OrderRequest> {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<OrderRequest>(this.ApiCreateOders, productData, { headers });
  }

  editStatusOrder(status: string, productId: number): Observable<any> {
    const orderUpdateRequest: OrderUpdateRequest = { status };
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put<OrderUpdateRequest>(`${this.ApiUpdateOrder}${productId}`, orderUpdateRequest, { headers });
  }


  deleteOrder(orderId: number): Observable<any> {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.delete(`${this.ApiDeleteOrderById}${orderId}`, { headers });
  }
}
