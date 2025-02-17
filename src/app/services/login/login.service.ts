import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { LoginResponse } from '../../models/login-response';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public accessToken: string;
  public role: string;
  public companyId: string;
  public employeeId: string;

  private readonly API = 'http://localhost:8080/login';

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { 
    this.accessToken = this.cookieService.get('accessToken') || '';
    this.role = this.cookieService.get('role') || '';
    this.companyId = this.cookieService.get('companyId') || '';
    this.employeeId = this.cookieService.get('employeeId') || '';
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const loginData = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<LoginResponse>(this.API, loginData, { headers }).pipe(
      tap(response => this.handleToken(response.accessToken))
    );
  }

  private handleToken(token: string) {
    this.accessToken = token;
    const decodedToken: any = jwtDecode(token);

    const subject = decodedToken.sub;
    if (subject.includes('-')) {
      if (subject.split('-').length === 3) {
        this.employeeId = subject.split('-')[0];
        this.companyId = subject.split('-')[1];
        this.role = decodedToken.scope
      } else {
        this.companyId = subject.split('-')[0];
        this.role = decodedToken.scope;
      }
    }
    this.cookieService.set('role', this.role, { secure: true });
    this.cookieService.set('accessToken', this.accessToken, { secure: true });
    this.cookieService.set('companyId', this.companyId, { secure: true });
    this.cookieService.set('employeeId', this.employeeId, { secure: true });
  }
}