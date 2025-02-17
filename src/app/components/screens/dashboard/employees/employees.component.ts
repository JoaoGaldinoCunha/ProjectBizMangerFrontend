import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalAddNewEmployeeComponent } from '../../../modals/modal-add-new-employee/modal-add-new-employee.component';
import { ModalEditEmployeeComponent } from '../../../modals/modal-edit-employee/modal-edit-employee.component';
import { EmployeeService } from '../../../../services/employee/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  imports: [ModalAddNewEmployeeComponent, ModalEditEmployeeComponent, CommonModule, FormsModule]
})
export class EmployeesComponent implements OnInit {

  dataAllEmployees: any[] = [];
  intervalId: any;
  dataAllEmployeesByName: any[] = [];
  name: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.LoadDataAllEmployees();
    this.startAutoRefresh();
  }

  @ViewChild(ModalAddNewEmployeeComponent) modalAddNewEmployeeComponent!: ModalAddNewEmployeeComponent;
  openNewEmployeeModal() {
    if (this.modalAddNewEmployeeComponent) {
      this.modalAddNewEmployeeComponent.openModal();
    } else {
      console.error('ModalAddNewEmployeeComponent não iniciado');
    }
  }

  @ViewChild(ModalEditEmployeeComponent) modalEditEmployeeComponent!: ModalEditEmployeeComponent;
  openEditEmployeeModal(employeeId: number) {
    console.log('Opening edit modal for employeeId:', employeeId);
    if (this.modalEditEmployeeComponent) {
      this.modalEditEmployeeComponent.openModal();
      this.modalEditEmployeeComponent.employeeId = employeeId;
      this.modalEditEmployeeComponent.LoadDataEmployee(employeeId);
    } else {
      console.error('ModalEditEmployeeComponent não iniciado');
    }
  }

  LoadDataAllEmployees() {
    this.employeeService.LoadDataAllEmployees().subscribe(
      (data: any) => {
        this.dataAllEmployees = data.map((employee: any) => {
          if(employee.role.name=="Employees"){
            employee.role.name='Funcionário'
          }
          return {
            ...employee,
            birthDate: employee.birthDate ? new Date(employee.birthDate).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '',
          };
        });
      },
      (error: any) => {
        console.error('Error loading employees data', error);
      }
    );
  }

  loadDataAllEmployeesByNameId(): void {
    if (this.name) {
      console.log(this.name);

      this.employeeService.LoadDataEmployeeByName(this.name).subscribe(
        (data: any) => {
          this.dataAllEmployees = data.map((employee: any) => ({
            ...employee,
            birthDate: employee.birthDate ? new Date(employee.birthDate).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '',
            name: employee.name || 'N/A',
            role: employee.role && employee.role.name ? employee.role.name : 'N/A',
            email: employee.email || 'N/A'
          }));
        },
        (error: any) => {
          console.error('Erro ao carregar os dados dos funcionários', error);
        }
      );
    } else {
      this.LoadDataAllEmployees();
    }
  }


  
  startAutoRefresh() {
    this.intervalId = setInterval(() => {
      if (!this.name) {
        this.LoadDataAllEmployees();
      }
    }, 5000);
  }

  clearAutoRefresh() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
