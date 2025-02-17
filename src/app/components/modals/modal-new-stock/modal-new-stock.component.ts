import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StockService } from '../../../services/stock/stock.service';
import { TbStock } from '../../../models/tb-stock';
import { CookieService } from 'ngx-cookie-service';
import { EmployeeService } from '../../../services/employee/employee.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modal-new-stock',
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-new-stock.component.html',
  styleUrl: './modal-new-stock.component.css'
})
export class ModalNewStockComponent {

  display = 'none';
  nomeEstoque = '';
  tipoEstoque = ''; 
  capacidadeMaxima = '';
  dataCriacao = '';
  responsavelId: number | null = null; 
  companyId = '';

  stockTypes: string[] = [];
  EmployeesData: any[] = [];

  constructor(
    private stockService: StockService,
    private employeesService: EmployeeService,
    private cookieService: CookieService
  ) {
    this.companyId = this.cookieService.get('companyId');
  }

  ngOnInit() {
    this.collectStockTypes();
    this.LoadDataAllEmployees();
  }

  openModal() {
    this.display = 'flex';
  }

  closeModal() {
    this.display = 'none';
  }

  addStock(): void {
    if (this.responsavelId === null) {
      console.error('Nenhum responsável selecionado.');
      return;
    }
    const stockData: TbStock = {
      name: this.nomeEstoque,
      responsible: {
        id: this.responsavelId
      },
      maxCapacity: Number(this.capacidadeMaxima),
      stockType: this.tipoEstoque, 
      company: {
        id: Number(this.companyId)
      },
      createdAt: new Date(this.dataCriacao).toISOString().split('T')[0]
    };

    this.stockService.createStock(stockData).subscribe(
      (response: any) => {
        console.log('Estoque criado com sucesso:', response);
      },
      (error: any) => {
        console.error('Erro ao criar o estoque:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
          color: "#4e3629",
          background: "#fff",
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3fc961',
        })
      }
    );
    this.closeModal()
  }

  LoadDataAllEmployees() {
    this.employeesService.LoadDataAllEmployees().subscribe(
      (data: any) => {
        this.EmployeesData = data.map((employee: any) => ({
          ...employee,
          birthDate: new Date(employee.birthDate).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
        }));
        console.log('Dados dos empregados:', this.EmployeesData); 
      },
      (error: any) => {
        console.error('Erro ao carregar dados dos empregados', error);
      }
    );
  }

  collectStockTypes() {
    this.stockTypes = ['Frigorifico', 'Geral', 'Seco', 'Liquido'];
  }
}
