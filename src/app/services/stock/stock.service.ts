import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { TbStock } from '../../models/tb-stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  companyId:number=0
  constructor(private httpClient:HttpClient,private cookieService:CookieService) { }

   private readonly ApiFindByAll = `http://localhost:8080/stock/allCompanyStocks/`;
   private readonly ApiiFindById = `http://localhost:8080/stock/searchStockById/`;

   private readonly ApiCreateStock=`http://localhost:8080/stock/create`
   private readonly ApiEditStock=`http://localhost:8080/stock/update/`
   private readonly ApiDeleteStock=`http://localhost:8080/stock/delete/`


    loadDataAllStocks(): Observable<any> {
      this.companyId = Number(this.cookieService.get('companyId'));
      const token = this.cookieService.get('accessToken');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.httpClient.get(`${this.ApiFindByAll}${this.companyId}`, { headers });
    }

    loadDataStockById(idStock:number): Observable<any> {
      const token = this.cookieService.get('accessToken');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.httpClient.get(`${this.ApiiFindById}${idStock}`, { headers });
    }

      createStock(stockData: TbStock): Observable<TbStock> {
        const token = this.cookieService.get('accessToken');
        const headers = new HttpHeaders({ 'Content-Type': 'application/json',  
              'Authorization': `Bearer ${token}`
        }
          
        );
        return this.httpClient.post<TbStock>(this.ApiCreateStock, stockData, { headers });
      }

      editStock(stockId:number,stockData: TbStock): Observable<TbStock> {
        const token = this.cookieService.get('accessToken');
        const headers = new HttpHeaders({ 'Content-Type': 'application/json',  
              'Authorization': `Bearer ${token}`
        }
          
        );
        return this.httpClient.put<TbStock>(`${this.ApiEditStock}${stockId}`, stockData, { headers });
      }

      
      deleteStock(stockId:number): Observable<any> {
        const token = this.cookieService.get('accessToken');
        const headers = new HttpHeaders({ 'Content-Type': 'application/json',  
              'Authorization': `Bearer ${token}`
        }
          
        );
        return this.httpClient.delete<TbStock>(`${this.ApiDeleteStock}${stockId}`, { headers });
      }
}
