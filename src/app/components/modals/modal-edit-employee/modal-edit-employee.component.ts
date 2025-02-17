import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employee/employee.service';
import { AdminOrCompanyEditEmployee } from '../../../models/admin-or-company-edit-employee';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modal-edit-employee',
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-edit-employee.component.html',
  styleUrls: ['./modal-edit-employee.component.css']
})
export class ModalEditEmployeeComponent {
  constructor(private employeeService: EmployeeService, private cookieService: CookieService) { }
  @Input() employeeId: number | null = null;

  display = 'none';
  EmployeeData: any = {
    name: '',
    cpf: '',
    email: '',
    password: '',
    birthDate: '',
    role: { id: 0, name: '' }
  };
  listPositionOptions: { id: number, name: string }[] = [];

  ngOnInit() {
    this.loadTypeOptions();
  }

  openModal() {
    this.display = 'flex';
    if (this.employeeId !== null) {
      this.LoadDataEmployee(this.employeeId);
    }
  }

  closeModal() {
    this.display = 'none';
  }

  updateOrder() {
    console.log({ ListStatus: this.EmployeeData.role.name });
    this.closeModal();
  }

  deleteOrder() {
    this.closeModal();
  }

  loadTypeOptions() {
    this.listPositionOptions = [
      { id: 3, name: 'Funcionário' },
      { id: 1, name: 'Admin' }
    ];
  }

  onCargoChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCargoName = selectElement.options[selectElement.selectedIndex].text;

    if (selectedCargoName === 'Admin') {
      this.EmployeeData.role.id = 3;
    } else if (selectedCargoName === 'Funcionário') {
      this.EmployeeData.role.id = 2;
    }

    this.EmployeeData.role.name = selectedCargoName;
  }

  editEmployee(): void {
    if (this.employeeId === null) {
      console.error('Employee ID está ausente');
      return;
    }

    const employeeData: AdminOrCompanyEditEmployee = {
      name: this.EmployeeData.name,
      email: this.EmployeeData.email,
      cpf: this.EmployeeData.cpf,
      birthDate: new Date(this.EmployeeData.birthDateFormatted).toISOString().split('T')[0],
      company: {
        id: Number(this.cookieService.get("companyId"))
      },
      role: {
        id: this.EmployeeData.role.id
      },
      password: this.EmployeeData.password
    };

    console.log('Dados enviados para o backend:', employeeData);
    this.employeeService.editEmployee(employeeData, this.employeeId).subscribe(
      response => {
        console.log(response);
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
        console.error('Erro ao atualizar o funcionário:', error);
      }
    );
    this.closeModal();
  }

  deleteEmployee() {
    if (this.employeeId != null) {
      this.employeeService.deleteEmployee(this.employeeId).subscribe(
        response => {
          console.log('Produto apagado com sucesso:', response);
          this.closeModal();
        },
        error => {
          this.closeModal()
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.message,
            color: "#4e3629",
            background: "#fff",
            confirmButtonText: 'Ok',
            confirmButtonColor: '#3fc961',
          })
          console.error('Erro ao apagar o produto:', error);
        }
      )
    }
  }

  formatDate(date: number): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  LoadDataEmployee(employeeId: number): void {
    console.log('LoadDataEmployee called with employeeId:', employeeId);
    this.employeeService.LoadDataEmployee(employeeId).subscribe((data: any) => {
      this.EmployeeData = data;
      this.EmployeeData.birthDateFormatted = this.formatDate(data.birthDate);

      this.EmployeeData.role.id = Number(data.role.id) || 0;
      this.EmployeeData.role.name = data.role.name;

      console.log('Employee data loaded:', this.EmployeeData);
      return this.EmployeeData;
    });
  }
}
