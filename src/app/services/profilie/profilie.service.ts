import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { AdminOrCompanyEditEmployee } from '../../models/admin-or-company-edit-employee';
import { TbEmployees } from '../../models/tb-employees';

@Injectable({
  providedIn: 'root'
})
export class ProfilieService {
  constructor(private cookieService:CookieService,private httpClient:HttpClient) { }

  private readonly ApiEmployeeUpdate= `http://localhost:8080/employees/update/`;
  private readonly ApiEmployeeById= `http://localhost:8080/employees/`;
      LoadDataEmployee(): Observable<any> {

        const token = this.cookieService.get('accessToken');
        const employeeId=this.cookieService.get('employeeId')
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        return this.httpClient.get(`${this.ApiEmployeeById}${employeeId}`, { headers });
      }

      editProfilie(dataProfilie: TbEmployees): Observable<any> {
        const token = this.cookieService.get('accessToken');
        const employeeId = this.cookieService.get('employeeId');
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        return this.httpClient.put(`${this.ApiEmployeeUpdate}${employeeId}`, dataProfilie, { headers });
      }
      
}
