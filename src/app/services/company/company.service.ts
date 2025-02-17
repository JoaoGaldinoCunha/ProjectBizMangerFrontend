import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { CompanyDetails2 } from '../../models/company-details2';
import { CompanyUpdateRequest } from '../../models/company-update-request';
import { TbCompany } from '../../models/tb-company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  private readonly ApiDeleteCompany = `http://localhost:8080/company/delete/`;
  private readonly ApiEditDataCompany = `http://localhost:8080/company/update/`;
  private readonly ApiAllDataCompany = `http://localhost:8080/company/searchById/`;

  editCompany(companytData: CompanyUpdateRequest): Observable<CompanyUpdateRequest> {
    const token = this.cookieService.get('accessToken');
    const companyId = this.cookieService.get('companyId');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put<CompanyUpdateRequest>(`${this.ApiEditDataCompany}${companyId}`, companytData, { headers });
  }

  allDataCompany(): Observable<CompanyDetails2> {
    const token = this.cookieService.get('accessToken');
    const companyId = this.cookieService.get('companyId');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<CompanyDetails2>(`${this.ApiAllDataCompany}${companyId}`, { headers });
  }

  deleteCompany(): Observable<any> {
    const companyId = this.cookieService.get('companyId');
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    );
    return this.httpClient.delete<TbCompany>(`${this.ApiDeleteCompany}${companyId}`, { headers });
  }
}
