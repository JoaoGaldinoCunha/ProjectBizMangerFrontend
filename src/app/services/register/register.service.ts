import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { RegisterResponse } from '../../models/register-request';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly API = 'http://localhost:8080/company/create';

  constructor(private httpClient: HttpClient) {}

  registerCompany(email: string, name: string, phone: string, password: string, cnpj: string, cep: string, complement: string, number: string): Observable<RegisterResponse> {
    const companyData = {
      email: email,
      name: name,
      phone: phone,
      password: password,
      cnpj: cnpj,
      cep: cep,
      complement: complement,
      number: number,
    };
    console.log('Registering user with the following data:', companyData);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<RegisterResponse>(this.API, companyData, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error status:', error.status);
        console.error('Error details:', error);

        let errorMessage = 'Erro no registro';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Problema ao registrar empresa: ${errorMessage}`,
          color: "#4e3629",
          background: "#fff",
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3fc961',
        });
        return throwError(error);
      })
    );
  }
}