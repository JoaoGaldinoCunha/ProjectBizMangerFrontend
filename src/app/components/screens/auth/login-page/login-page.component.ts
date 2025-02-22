import { Component } from '@angular/core';
import { ButtonComponent } from '../../../common/button/button.component';
import { LoginService } from '../../../../services/login/login.service';
import { LoginResponse } from '../../../../models/login-response';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  
    verifyEmail(email: string) {
      if (this.email == '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Preencha o campo email!',
          color: "#4e3629",
          background: "#fff",
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3fc961',
        })
        return false;
      }
  
      if (this.email.indexOf('@') < 0 || this.email.indexOf('.') < 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email invalido! Necessario @ e .',
          color: "#4e3629",
          background: "#fff",
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3fc961',
        })
        return false;
      }
      return true;
    }

    verifyPassword(password: string) {
      if (this.password == '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Preencha o campo senha!',
          color: "#4e3629",
          background: "#fff",
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3fc961',
        })
        return false;
  
      }
      if (this.password.length < 8) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Senha deve ter no minímo 8 caracteres!',
          color: "#4e3629",
          background: "#fff",
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3fc961',
        })
        return false;
      }
      return true;
    }
  


  onLogin() {
    if(!this.verifyEmail(this.email) || !this.verifyPassword(this.password)) return ;
    this.loginService.login(this.email, this.password).subscribe(
      (response: LoginResponse) => {
      
        const role = this.loginService.role;
        console.log('Role:', role)

        if (this.loginService.role === 'Company') {
          this.router.navigate(['/company']);
        } else if (this.loginService.role === 'Employees' || this.loginService.role === 'Admin') {
          this.router.navigate(['/dashboard/alertas']);
        } else {
          console.error('Papel não reconhecido');
        } 
      },
      error => {
        console.error("Falha no login", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Verifique seu email e senha.',
          color: "#4e3629",
          background: "#fff",
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3fc961',
        })
        
      }
    );
  }

  RedirectToRegistry() {
    this.router.navigate(['/register']);
  }

  
  RedirectToLandingPage() {
    this.router.navigate(['/']);
  }
}