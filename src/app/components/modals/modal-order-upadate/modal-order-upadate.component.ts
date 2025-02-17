import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../../services/orders/oders.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modal-order-upadate',
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-order-upadate.component.html',
  styleUrls: ['./modal-order-upadate.component.css']
})
export class ModalOrderUpadateComponent {

  @Input() orderId: number | undefined;
  status: string = '';
  display = 'none';
  numeroCompra = '';
  cliente = '';
  ListStatus = [{ name: '' }];
  listStatusOptions: string[] = [];
  AllDataOrder: any[] = [];
  orderData: any = {};

  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.loadStatusOptions();
  }

  openModal() {
    this.display = 'flex';
    this.loadDataAllProductsByCompanyId();
  }

  closeModal() {
    this.display = 'none';
  }

  loadDataAllProductsByCompanyId(): void {
    if (this.orderId !== undefined) {
      console.log(this.orderId)

      this.orderService.LoadDataOderById(this.orderId).subscribe(
        (data: any) => {
          this.AllDataOrder = data;
          if (data.length > 0) {
            this.status = data[0].status;
          }
        },
        (error: any) => {
          console.error('Erro ao carregar os dados dos pedido', error);
        }
      );
    }
  }

  updateOrder() {
    if (this.orderId !== undefined) {
      this.orderService.editStatusOrder(this.status, this.orderId).subscribe(
        (data: any) => {
          console.log('Status atualizado:', data);
        },
        (error: any) => {
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
          console.error('Erro ao atualizar o status do pedido', error);
        }
      );
    }
    this.closeModal();
  }


  deleteOrder() {
    if (this.orderId != null) {
      this.orderService.deleteOrder(this.orderId).subscribe(
        response => {
          this.closeModal();
          console.log('Produto apagado com sucesso:', response);

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

  loadStatusOptions() {
    this.listStatusOptions = ['Entregue', 'Pendente', 'Negado', 'Enviado'];
  }

  clearData(): void {
    this.orderData = {};
  }
}
