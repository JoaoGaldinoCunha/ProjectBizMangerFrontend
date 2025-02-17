import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TbEmployees } from '../../models/tb-employees';
import { AdminOrCompanyEditEmployee } from '../../models/admin-or-company-edit-employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  private readonly ApiAllComapanyEmployees = `http://localhost:8080/employees/allCompanyEmployees/`;
  private readonly ApiCreateEmployee = `http://localhost:8080/employees/create`
  private readonly ApiUpdateEmployeeByAdmin = `http://localhost:8080/employees/updateByAdminOrCompany/`
  private readonly ApiEmployeeById= `http://localhost:8080/employees/`;
  private readonly ApiEmployeeByName=`http://localhost:8080/employees/searchByEmployeeName/`
  private readonly ApiEmployeeDeleteById=`http://localhost:8080/employees/delete/`

  LoadDataAllEmployees(): Observable<any> {
    const companyId = this.cookieService.get('companyId');
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(`${this.ApiAllComapanyEmployees}${companyId}`, { headers });
  }


  createEmployee(employeeData: TbEmployees): Observable<TbEmployees> {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<TbEmployees>(this.ApiCreateEmployee, employeeData, { headers });
  }

  editEmployee(employeeData: AdminOrCompanyEditEmployee, employeeId: number): Observable<AdminOrCompanyEditEmployee> {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put<AdminOrCompanyEditEmployee>(`${this.ApiUpdateEmployeeByAdmin}${employeeId}`, employeeData, { headers });
  }

  deleteEmployee(employeeId: number): Observable<any> {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.delete(`${this.ApiEmployeeDeleteById}${employeeId}`, { headers });
  }

  LoadDataEmployee(employeeId:number): Observable<any> {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(`${this.ApiEmployeeById}${employeeId}`, { headers });
  }

  LoadDataEmployeeByName(name:string): Observable<any> {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(`${this.ApiEmployeeByName}${name}`, { headers });
  }

}