import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product/product.service';
import { EditQuantityProduct } from '../../../models/edit-quantity-product';
import { response } from 'express';
import { error } from 'console';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modal-stock-edit-product-quantity',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-stock-edit-product-quantity.component.html',
  styleUrl: './modal-stock-edit-product-quantity.component.css'
})
export class ModalStockEditProductQuantityComponent {
  @Input() productId: number | null = null;
  constructor(private productService: ProductService) { }

  dataProduct: any = {};
  display = 'none';
  quantidade: number = 0;

  ngOnInit() { }

  openModal() {
    this.display = 'flex';
    this.LoadDataProductDetails();
  }

  closeModal() {
    this.display = 'none';
  }

  LoadDataProductDetails() {
    if (this.productId !== null) {
      this.productService.LoadDataProductById(this.productId).subscribe(
        (data: any) => {
          this.dataProduct = data;
          this.quantidade = this.dataProduct.quantity;
        },
        (error: any) => {
          console.error('Error loading product data', error);

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
    }
  }

  editQuantityProduct(): void {
    if (this.productId === null) {
      console.error('Product ID está ausente');
      return;
    }

    const productData: EditQuantityProduct = {
      quantity: this.quantidade,
      productId: this.productId
    };

    this.productService.editProductQuantity(productData).subscribe(
      response => {
        console.log('Produto atualizado com sucesso:', response);
      },
      error => {
        console.error('Erro ao atualizar o produto:', error);
      }
    );
    this.closeModal();
  }


}
