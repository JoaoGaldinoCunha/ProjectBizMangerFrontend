import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../common/button/button.component';
import { RegisterService } from '../../../../services/register/register.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-page',
  imports: [ButtonComponent, FormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  constructor(private registerService: RegisterService, private router: Router) { }

  email: string = '';
  nameCompany: string = '';
  phone: string = '';
  password: string = '';
  cnpj: string = '';
  cep: string = '';
  complement: string = '';
  number: string = '';

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
  //###############################################

  verifyNameCompany(nameCompany: string) {
    if (this.nameCompany == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha o campo nome da empresa!',
        color: "#4e3629",
        background: "#fff",
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3fc961',
      })
      return false;
    }
    return true;
  }

  //###############################################
  maskPhone() {
    let phone = this.phone.replace(/\D/g, '');
    if (phone.length > 0) {
      phone = '(' + phone;
    }
    if (phone.length > 2) {
      phone = phone.substring(0, 3) + ') ' + phone.substring(3);
    }
    if (phone.length > 9) {
      phone = phone.substring(0, 10) + '-' + phone.substring(10);
    }
    this.phone = phone;
  }

  unmaskPhone(phone: string) {
    return phone = this.phone.replace(/\D/g, '');
  }

  verifyPhone(phone: string) {
    if (this.phone == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha o campo telefone!',
        color: "#4e3629",
        background: "#fff",
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3fc961',
      })
      return false;
    }

    if (this.phone.length != 15) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Telefone invalido!',
        color: "#4e3629",
        background: "#fff",
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3fc961',
      })
      return false;
    }

    if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(this.phone)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Telefone com caracteres inválidos!',
        color: "#4e3629",
        background: "#fff",
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3fc961',
      })
      return false;
    }
    return true;
  }

  //###############################################

  verifyCnpj(cnpj: string) {
    if (this.cnpj == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha o campo CNPJ!',
        color: "#4e3629",
        background: "#fff",
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3fc961',
      })
      return false;
    }

    if (this.cnpj.length != 18) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'CNPJ deve ter 14 caracteres!',
        color: "#4e3629",
        background: "#fff",
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3fc961',
      })
      return false;

    }

    if (!/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(this.cnpj)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'CNPJ caracteres com invalido!',
        color: "#4e3629",
        background: "#fff",
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3fc961',
      })
      return false;
    }
    return true
  }

  maskCnpj() {
    let cnpj = this.cnpj.replace(/\D/g, '');
    if (cnpj.length > 0) {
      cnpj = cnpj.substring(0, 2) + '.' + cnpj.substring(2);
    }
    if (cnpj.length > 5) {
      cnpj = cnpj.substring(0, 6) + '.' + cnpj.substring(6);
    }
    if (cnpj.length > 9) {
      cnpj = cnpj.substring(0, 10) + '/' + cnpj.substring(10);
    }
    if (cnpj.length > 13) {
      cnpj = cnpj.substring(0, 15) + '-' + cnpj.substring(15);
    }
    this.cnpj = cnpj;
  }

  unmaskCnpj(cnpj: string) {
    return cnpj = this.cnpj.replace(/\D/g, '');
  }

  //###############################################
  verifyCep(cep: string) {
    if (this.cep == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha o campo CEP!',
        color: "#4e3629",
        background: "#fff",
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3fc961',
      })
      return false;
    }

    if (this.cep.length != 9) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'CEP invalido!',
        color: "#4e3629",
        background: "#fff",
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3fc961',
      })
      return false;
    }

    if (!/^\d{5}-\d{3}$/.test(this.cep)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'CEP invalido!',
        color: "#4e3629",
        background: "#fff",
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3fc961',
      })
      return false;
    }
    return true;
  }

  maskCep() {
    let cep = this.cep.replace(/\D/g, '');
    if (cep.length > 0) {
      cep = cep.substring(0, 5) + '-' + cep.substring(5);
    }
    this.cep = cep;
  }

  unmaksCep(cep: string) {
    return cep = this.cep.replace(/\D/g, '');
  }

  //###############################################

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
  //###############################################
  verfyComplement(complement: string) {
    if (this.complement == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha o campo complemento!',
        color: "#4e3629",
        background: "#fff",
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3fc961',
      })
      return false;
    }
    return true;
  }
  //###############################################

  verifyNumber(number: string) {
    if (this.number == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha o campo número!',
        color: "#4e3629",
        background: "#fff",
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3fc961',
      })
      return false;
    }
    if (!/^\d+$/.test(this.number)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Numero inválido!',
        color: "#4e3629",
        background: "#fff",
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3fc961',
      })
      return false;

    }
    return true;
  }

  //###############################################

  onRegister() {
    const unmaskPhone = this.unmaskPhone(this.phone);
    const unmaskCnpj = this.unmaskCnpj(this.cnpj);
    const unmaskCep = this.unmaksCep(this.cep);

    if (!this.verifyEmail(this.email)) return;
    if (!this.verifyPassword(this.password)) return;
    if (!this.verifyNameCompany(this.nameCompany)) return;
    if (!this.verifyPhone(this.phone)) return;
    if (!this.verifyCnpj(this.cnpj)) return;
    if (!this.verifyCep(this.cep)) return;
    if (!this.verifyNumber(this.number)) return;
    if (!this.verfyComplement(this.complement)) return;

    const companyData = {
      email: this.email,
      name: this.nameCompany,
      phone: unmaskPhone,
      password: this.password,
      cnpj: unmaskCnpj,
      cep: unmaskCep,
      complement: this.complement,
      number: this.number,
    };

    console.log('Registering user with the following data:', companyData);

    this.registerService.registerCompany(
      companyData.email,
      companyData.name,
      companyData.phone,
      companyData.password,
      companyData.cnpj,
      companyData.cep,
      companyData.complement,
      companyData.number
    ).subscribe(
      response => {
        console.log('Registration successful:', response);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Empresa registrada com sucesso!',
          color: "#4e3629",
          background: "#fff",
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3fc961',
        });
        setTimeout(() => {
          this.RedirectToLogin();
        }, 2000);
      },
      error => {
        console.error('Registration error:', error);
        setTimeout(() => {
          this.RedirectToRegister();
        }, 2000);
      }
    );
  }
  //###############################################

  RedirectToLandingPage() {
    this.router.navigate(['/']);
  }

  RedirectToLogin() {
    this.router.navigate(['/login']);
  }

  RedirectToRegister() {
    this.router.navigate(['/register']);
  }
}
