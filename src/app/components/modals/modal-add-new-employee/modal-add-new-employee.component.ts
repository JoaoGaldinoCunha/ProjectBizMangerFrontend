import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule, NumberSymbol } from '@angular/common';
import { TbEmployees } from '../../../models/tb-employees';
import { EmployeeService } from '../../../services/employee/employee.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-modal-add-new-employee',
  imports: [FormsModule,CommonModule],
  templateUrl: './modal-add-new-employee.component.html',
  styleUrl: './modal-add-new-employee.component.css'
})
export class ModalAddNewEmployeeComponent {

  display = 'none';
  nome: string = '';
  dataNascimento: string = '';
  email: string = '';
  senha: string = '';
  cpf: string = '';
  empresaId: number = 0;
  cargo:string ='';
  roleId: number = 0;

  ListPositionStatus = [{
    name: ''
  }];
  listPositionOptions: string[] = [];
;

  constructor(private employeeService: EmployeeService,private cookieService:CookieService) { }

  onCargoChange(event:Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCargo = selectElement.value;
    if (selectedCargo === 'Funcionario') {
      this.roleId = 3;
    } else if (selectedCargo === 'Admin') {
      this.roleId = 1;
    } 
  }

  
  addUser(): void {
    const userData: TbEmployees = {
      name: this.nome,
      birthDate: this.dataNascimento,
      email: this.email,
      password: this.senha,
      cpf: this.cpf,
      company: {
        id: Number(this.cookieService.get('companyId'))
      },
      role: {
        id: this.roleId
      }
    };
    
    this.employeeService.createEmployee(userData).subscribe(
      response => {
        console.log('Usuário criado com sucesso:', response);
      },
      error => {
        console.error('Erro ao criar o usuário:', error);
      }
    );
    this.closeModal();
  }


  ngOnInit() {
    this.loadStatusOptions()
  }


  openModal() {
    this.display = 'flex';
  }


  closeModal() {
    this.display = 'none';
  }


  
  deleteOrder(){
    this.closeModal();
  }
  

  loadStatusOptions() {
    this.listPositionOptions = ['Funcionario', 'Admin']
  }

}
