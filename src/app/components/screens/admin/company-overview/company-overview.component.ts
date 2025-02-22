import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalEditStockComponent } from '../../../modals/modal-edit-stock/modal-edit-stock.component';
import { ModalAddNewEmployeeComponent } from '../../../modals/modal-add-new-employee/modal-add-new-employee.component';
import { ModalEditCompanyComponent } from '../../../modals/modal-edit-company/modal-edit-company.component';
import { EmployeeService } from '../../../../services/employee/employee.service';
import { OrdersService } from '../../../../services/orders/oders.service';
import { StockService } from '../../../../services/stock/stock.service';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalEditEmployeeComponent } from '../../../modals/modal-edit-employee/modal-edit-employee.component';
import { CompanyService } from '../../../../services/company/company.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-company-overview',
  imports: [ModalEditStockComponent, ModalEditCompanyComponent, ModalAddNewEmployeeComponent, FormsModule, CommonModule, ModalEditEmployeeComponent],
  templateUrl: './company-overview.component.html',
  styleUrl: './company-overview.component.css'
})
export class CompanyOverviewComponent implements OnInit {
  dataAllEmployees: any[] = [];
  dataAllOrders: any[] = [];
  dataAllStocks: any[] = [];
  id: number = 0;
  orderId: number | null = null;

  private updateInterval: any;

  ngOnInit(): void {
    this.loadDataAllEmployees();
    this.loadDataAllOrders();
    this.loadDataAllStocks();

    this.updateInterval = setInterval(() => {
      this.loadDataAllEmployees();
      this.loadDataAllOrders();
      this.loadDataAllStocks();
    }, 2000); 
  }


  constructor(private employeesService: EmployeeService, private orderService: OrdersService, private stockService: StockService, private companyService: CompanyService, private cookieService: CookieService) { }
  @ViewChild(ModalEditStockComponent) modalEditStockComponent!: ModalEditStockComponent;
  openEditStockeModal(stockId: number) {
    if (this.modalEditStockComponent) {
      this.modalEditStockComponent.stockId = stockId
      this.modalEditStockComponent.openModal()
    } else {
      console.error('ModalEditStock não iniciaddo');
    }
  }

  @ViewChild(ModalEditCompanyComponent) modalEditCompanyComponent!: ModalEditCompanyComponent;
  openEditCompanyModal() {
    if (this.modalEditCompanyComponent) {
      this.modalEditCompanyComponent.openModal()
    } else {
      console.error('ModalEditCompany não iniciaddo');
    }
  }

  @ViewChild(ModalAddNewEmployeeComponent) modalAddNewEmployeeComponent!: ModalAddNewEmployeeComponent;
  openNewEmployeeModal() {
    if (this.modalAddNewEmployeeComponent) {
      this.modalAddNewEmployeeComponent.openModal()
    } else {
      console.error('ModalAddNewEmployeeComponent não iniciaddo');
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


  loadDataAllEmployees() {
    this.employeesService.LoadDataAllEmployees().subscribe(
      (data: any) => {
        this.dataAllEmployees = data.map((employee: any) => {
          if (employee.role.name == "Employees") {
            employee.role.name = 'Funcionário'
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


  loadDataAllOrders() {
    this.orderService.LoadDataAllOrdersInCompany().subscribe(
      (data: any) => {
        console.log(data)
        this.dataAllOrders = data.map((employee: any) => {
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

  loadDataAllStocks() {
    this.stockService.loadDataAllStocks().subscribe(
      (data: any) => {
        this.dataAllStocks = data;
      },
      (error: any) => {
        console.error('Error loading stocks data', error);
      }
    );
  }

  deleteStock(stockId: number) {
    this.stockService.deleteStock(stockId).subscribe(
      response => {
        console.log('Estoque deletado com sucesso:', response);
        this.loadDataAllStocks();
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
        console.error('Erro ao deletar o estoque:', error);
      }
    )
  }

  deleteCompany() {
    this.companyService.deleteCompany().subscribe(
      response => {
        console.log('Estoque deletado com sucesso:', response);
        this.loadDataAllStocks();
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
        console.error('Erro ao deletar o estoque:', error);
      }
    )
  }

  
    deleteOrder(orderId: number) {
      this.orderService.deleteOrder(orderId).subscribe(
        response => {
          console.log('Pedido apagado com sucesso:', response);
          this.loadDataAllOrders(); 
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
          });
          console.error('Erro ao apagar o pedido:', error);
        }
      );
    }

   
}
