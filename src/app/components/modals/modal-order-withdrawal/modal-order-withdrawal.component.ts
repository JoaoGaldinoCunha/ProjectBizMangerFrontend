import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product/product.service';
import { EmployeeService } from '../../../services/employee/employee.service';
import { OrdersService } from '../../../services/orders/oders.service';
import { OrderRequest } from '../../../models/order-request';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal-order-withdrawal',
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-order-withdrawal.component.html',
  styleUrls: ['./modal-order-withdrawal.component.css']
})
export class ModalOrderWithdrawalComponent implements OnInit {

  constructor(private productService: ProductService, private employeeService: EmployeeService, private orderService: OrdersService,private cookieService:CookieService) { }

  dataAllProducts: any[] = [];
  dataAllEmployees: any[] = [];

  display = 'none';
  responsavel = '';
  cliente = '';
  cnpj = '';
  destino = '';

  ngOnInit(): void {
    this.loadDataAllEmployees();
  }

  openModal(): void {
    this.display = 'flex';
    this.loadDataAllProductsByCompanyId();
  }

  closeModal(): void {
    this.display = 'none';
  }


  removeLastItem(): void {
    if (this.items.length > 1) {
      this.items.pop();
    }
  }

  loadDataAllProductsByCompanyId(): void {
    this.productService.LoadDataAllProductByCompanyId().subscribe(
      (data: any) => {
        this.dataAllProducts = data;
      },
      (error: any) => {
        console.error('Erro ao carregar os dados dos produtos', error);
      }
    );
  }

  loadDataAllEmployees(): void {
    this.employeeService.LoadDataAllEmployees().subscribe(
      (data: any) => {
        this.dataAllEmployees = data;
      },
      (error: any) => {
        console.error('Erro ao carregar os dados dos empregados', error);
      }
    );
  }

  items = [{
    productId: 0,
    quantity: 0
  }];

  addItem(): void {
    this.items.push({
      productId: 0, 
      quantity: 0
    });
  }

  addProduct(): void {
    const orderData: OrderRequest = {
      order: {
        responsible: {
          id: Number(this.cookieService.get('employeeId')) 
        },
        clientCnpj: this.cnpj,
        destination: this.destino,
        status: 'Pendente'
      },
      products: this.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    this.orderService.createOrder(orderData).subscribe(
      response => {
        console.log('Pedido criado com sucesso:', response);
        
      },
      error => {
        console.error('Erro ao criar o pedido:', error);
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
    this.closeModal();
  }


}
