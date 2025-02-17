import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfilieService } from '../../../../services/profilie/profilie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { EditEmployees } from '../../../../models/edit-employees';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-profilie-screen',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './profilie-screen.component.html',
  styleUrls: ['./profilie-screen.component.css']
})
export class ProfilieScreenComponent implements OnInit {
  EmployeeData: any = null;

  constructor(private profilieService: ProfilieService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.LoadDataEmployee();
  }

  LoadDataEmployee(): void {
    this.profilieService.LoadDataEmployee().subscribe((data: any) => {
      this.EmployeeData = data;
      this.EmployeeData.birthDateFormatted = this.formatDate(data.birthDate);
    });
  }

  editEmployee(): void {
    if (!this.EmployeeData) {
      console.error('Employee data está ausente');
      return;
    }

    const employeeData: EditEmployees = {
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
      password: this.EmployeeData.password,
      oldPassword: this.EmployeeData.oldPassword
    };

    console.log('Dados enviados para o backend:', employeeData);
    this.profilieService.editProfilie(employeeData).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Oops...',
          text:"Funciónario atualizado com sucesso.",
          color: "#4e3629",
          background: "#fff",
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3fc961',
        })
        console.log('Funcionário atualizado com sucesso:', response);
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
  }

  formatDate(date: number): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
}
