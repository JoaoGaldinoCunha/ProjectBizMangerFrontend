import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService } from '../../../services/stock/stock.service';
import { TbStock } from '../../../models/tb-stock';
import { CookieService } from 'ngx-cookie-service';
import { EmployeeService } from '../../../services/employee/employee.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modal-edit-stock',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-edit-stock.component.html',
  styleUrls: ['./modal-edit-stock.component.css']
})
export class ModalEditStockComponent implements OnInit {
  @Input() stockId: number | null = null;

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
    private cookieService: CookieService,
    private employeesService: EmployeeService
  ) {
    this.companyId = this.cookieService.get('companyId');
  }

  ngOnInit() {
    this.collectStockTypes();
    this.loadDataAllEmployees();
  }

  openModal() {
    this.display = 'flex';
    if (this.stockId !== null) {
      this.loadDataStockById(this.stockId);
    } else {
      console.error('Stock ID is null');
    }
  }

  closeModal() {
    this.display = 'none';
  }

  editStock(): void {
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

    if (this.stockId !== null) {
      this.stockService.editStock(this.stockId, stockData).subscribe(
        (response: any) => {
          console.log('Estoque atualizado com sucesso:', response);
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.message,
            color: "#4e3629",
            background: "#fff",
            confirmButtonText: 'Ok',
            confirmButtonColor: '#3fc961',
          })
          console.error('Erro ao atualizar o estoque:', error);
        }
      );
    } else {
      console.error('Stock ID is null');
    }

    this.closeModal();
  }

  loadDataStockById(stockId: number) {
    this.stockService.loadDataStockById(stockId).subscribe(
      (data: any) => {
        this.nomeEstoque = data.name;
        this.tipoEstoque = data.stockType;
        this.capacidadeMaxima = data.maxCapacity;
        this.dataCriacao = new Date(data.createdAt).toISOString().split('T')[0];
        this.responsavelId = data.responsibleId;
        if (!this.EmployeesData.some(employee => employee.id === data.responsibleId)) {
          this.EmployeesData.push({ id: data.responsibleId, name: data.responsibleName });
        }
      },
      (error: any) => {
        console.error('Erro ao carregar dados do estoque', error);
      }
    );
  }

  loadDataAllEmployees() {
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
