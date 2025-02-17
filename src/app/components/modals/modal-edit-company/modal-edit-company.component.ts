import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../../services/company/company.service';
import Swal from 'sweetalert2';
import { CompanyDetails2 } from '../../../models/company-details2';
import { CompanyUpdateRequest } from '../../../models/company-update-request';

@Component({
  selector: 'app-modal-edit-company',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-edit-company.component.html',
  styleUrls: ['./modal-edit-company.component.css']
})
export class ModalEditCompanyComponent implements OnInit {

  companyData: CompanyDetails2 | undefined;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.loadDataAllCompany();
  }

  display = 'none';
  email = '';
  nameCompany = '';
  phone = '';
  password = '';
  cnpj = '';
  cep = '';
  street = '';
  neighborhood = '';
  city = '';
  state = '';
  complement = '';
  number = '';
  oldPassword = '';

  openModal() {
    this.display = 'flex';
    this.loadDataAllCompany();
  }

  closeModal() {
    this.display = 'none';
  }

  editCompany() {
    const companyData: CompanyUpdateRequest = {
      oldPassword: this.oldPassword,
      email: this.email,
      name: this.nameCompany,
      phone: this.phone,
      password: this.password,
      cnpj: this.cnpj,
      cep: this.cep,
      street: this.street,
      neighborhood: this.neighborhood,
      city: this.city,
      state: this.state,
      complement: this.complement,
      number: this.number
    };

    console.log('Updating company with the following data:', companyData);

    this.companyService.editCompany(companyData).subscribe(
      response => {
        this.closeModal();
        console.log('Update successful:', response);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Empresa atualizada com sucesso!',
          color: "#4e3629",
          background: "#fff",
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3fc961',
        });
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
          color: "#4e3629",
          background: "#fff",
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3fc961',
        })
        console.error('Update error:', error);
      }
    );
  }

  loadDataAllCompany() {
    this.companyService.allDataCompany().subscribe(
      (data: CompanyDetails2) => {
        this.companyData = data;
        this.email = data.email;
        this.nameCompany = data.name;
        this.phone = data.phone;
        this.password = data.password;
        this.cnpj = data.cnpj;
        this.cep = data.cep;
        this.street = data.street;
        this.neighborhood = data.neighborhood;
        this.city = data.city;
        this.state = data.state;
        this.complement = data.complement;
        this.number = data.number;
      },
      (error: any) => {
        console.error('Error loading company data', error);
      }
    );
  }
}
