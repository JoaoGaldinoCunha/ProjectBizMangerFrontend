import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalOrderWithdrawalComponent } from '../../../modals/modal-order-withdrawal/modal-order-withdrawal.component';
import { ModalOrderUpadateComponent } from '../../../modals/modal-order-upadate/modal-order-upadate.component';
import { OrdersService } from '../../../../services/orders/oders.service';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [ModalOrderWithdrawalComponent, ModalOrderUpadateComponent, CommonModule, FormsModule],
})
export class OrdersComponent implements OnInit, OnDestroy {
  dataAllOrders: any[] = [];
  intervalId: any;
  id: number = 0;

  constructor(private orderService: OrdersService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.LoadDataAllOrdersInStock();
    this.startAutoRefresh();
  }

  ngOnDestroy(): void {
    this.clearAutoRefresh();
  }

  getButtonClass(status: string): string {
    switch (status) {
      case 'Pendente':
        return 'status_button pending';
      case 'Negado':
        return 'status_button denied';
      case 'Enviado':
        return 'status_button completed';
      case 'Entregue':
        return 'status_button delivered';
      default:
        return '';
    }
  }

  @ViewChild(ModalOrderWithdrawalComponent) modalOrderWithdrawal!: ModalOrderWithdrawalComponent;
  openNewOrderModal() {
    this.modalOrderWithdrawal.openModal();
  }

  @ViewChild(ModalOrderUpadateComponent) modalOrderUpadate!: ModalOrderUpadateComponent;
  openUpdateOrderModal(orderId: number) {
    console.log('Opening update modal for orderId:', orderId);
    this.modalOrderUpadate.clearData();  
    if (this.modalOrderUpadate) {
      this.modalOrderUpadate.openModal();
      this.modalOrderUpadate.orderId = orderId;
      this.modalOrderUpadate.loadDataAllProductsByCompanyId();
    } else {
      console.error('ModalOrderUpadateComponent não iniciado');
    }

    if (this.id) {
      this.loadDataAllOrdersById();
    } else {
      this.LoadDataAllOrdersInStock();
    }
  }

  LoadDataAllOrdersInStock() {
    const companyId = parseInt(this.cookieService.get('companyId'), 10);
    this.orderService.LoadDataAllOrdersInCompany().subscribe(
      (data: any) => {
        this.dataAllOrders = data.map((order: any) => ({
          ...order,
          orderId: order.orderId || 'N/A',
          createdAt: order.createdAt ? new Date(order.createdAt).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '',
          clientCnpj: order.clientCnpj || 'N/A',
          destination: order.destination || 'N/A',
          productQuantityItems: order.productQuantityItems || 0,
          status: order.status || 'N/A'
        }));
      },
      (error: any) => {
        console.error('Error loading orders data', error);
      }
    );
  }

  loadDataAllOrdersById(): void {
    if (this.id) {
      const companyId = parseInt(this.cookieService.get('companyId'), 10);
      console.log(this.id);

      this.orderService.LoadDataOderByIdCompanyAndOrder(companyId, this.id).subscribe(
        (data: any) => {
          this.dataAllOrders = data.map((order: any) => ({
            ...order,
            orderId: order.orderId || 'N/A',
            createdAt: order.createdAt ? new Date(order.createdAt).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '',
            clientCnpj: order.clientCnpj || 'N/A',
            destination: order.destination || 'N/A',
            productQuantityItems: order.productQuantityItems || 0,
            status: order.status || 'N/A'
          }));
        },
        (error: any) => {
          console.error('Erro ao carregar os dados dos pedidos', error);
        }
      );
    } else {
      this.LoadDataAllOrdersInStock();
    }
  }

  startAutoRefresh() {
    this.intervalId = setInterval(() => {
      if (!this.id) { 
        this.LoadDataAllOrdersInStock();
      } else {
        this.loadDataAllOrdersById(); 
      }
    }, 2000);
  }

  clearAutoRefresh() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
