import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { TbProduct } from '../../models/tb-product';
import { EditProduct } from '../../models/edit-product';
import { EditQuantityProduct } from '../../models/edit-quantity-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  private readonly ApiProductStock = `http://localhost:8080/product/searchAllProductsByStockId/`;
  private readonly ApiCreateProduct = `http://localhost:8080/product/create`;
  private readonly ApiEditProduct = `http://localhost:8080/product/update/`;
  private readonly ApiEditProductQuatity = `http://localhost:8080/product/update/quantity`;
  private readonly ApiProductById = `http://localhost:8080/product/searchProductById/`;
  private readonly ApiAllProductByCompanyId = `http://localhost:8080/product/searchAllProductsByCompanyId/`;
  private readonly ApiProductByIdAndIdStock = `http://localhost:8080/product/searchByProductName/`;
  private readonly ApiDeleteProductById=`http://localhost:8080/product/delete/`
  LoadDataAllProductsInStock(stockId: number): Observable<any> {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(`${this.ApiProductStock}${stockId}`, { headers });
  }

  LoadDataProductById(productById: number): Observable<any> {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(`${this.ApiProductById}${productById}`, { headers });
  }

  LoadDataAllProductByCompanyId(): Observable<any> {
    const token = this.cookieService.get('accessToken');
    const companyId = this.cookieService.get('companyId');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(`${this.ApiAllProductByCompanyId}${companyId}`, { headers });
  }

  LoadDataProdcutByIdStockAndProduct(stockId: number, name: string): Observable<any> {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(`${this.ApiProductByIdAndIdStock}${stockId}/${name}`, { headers });
  }

  createProduct(productData: TbProduct): Observable<TbProduct> {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<TbProduct>(this.ApiCreateProduct, productData, { headers });
  }

  editProduct(productData: EditProduct, productId: number): Observable<EditProduct> {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put<EditProduct>(`${this.ApiEditProduct}${productId}`, productData, { headers });
  }

  editProductQuantity(data: EditQuantityProduct): Observable<any> {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put<any>(this.ApiEditProductQuatity, data, { headers });
  }

  deleteProduct(productId: number): Observable<any> {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.delete(`${this.ApiDeleteProductById}${productId}`, { headers });
  }
}
