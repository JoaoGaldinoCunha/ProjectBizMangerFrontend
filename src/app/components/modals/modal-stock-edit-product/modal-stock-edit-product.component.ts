import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product/product.service';
import { EditProduct } from '../../../models/edit-product';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modal-stock-edit-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-stock-edit-product.component.html',
  styleUrl: './modal-stock-edit-product.component.css'
})
export class ModalStockEditProductComponent {
  @Input() stockId: number | null = null;
  @Input() productId: number | null = null;

  constructor(private productService: ProductService) { }

  display = 'none';
  nomeProduto = '';
  descricao = '';
  categoria = '';
  precoCompra = '';
  quantidade = '';
  unidade = '';
  dataValidade = '';

  valorLimite = '';
  items = [{
    name: '',
  }];
  optionsMeasure: string[] = [];

  ngOnInit() {
    this.collectOptionsMeasure();
  }

  openModal() {
    this.display = 'flex';
    this.LoadDataProductDetails();
  }

  closeModal() {
    this.display = 'none';
  }


  editProduct(): void {
    if (this.productId === null) {
      console.error('Product ID está ausente');
      return;
    }
    const productData: EditProduct = {
      name: this.nomeProduto,
      description: this.descricao,
      purchasePrice: Number(this.precoCompra),
      expirationDate: new Date(this.dataValidade).toISOString().split('T')[0],
      stock: {
        id: this.stockId ? this.stockId : 0
      }
    };

    this.productService.editProduct(productData, this.productId).subscribe(
      response => {
        this.closeModal()
        console.log('Produto atualizado com sucesso:', response);
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
        console.error('Erro ao atualizar o produto:', error);
      }
    );
    this.closeModal();
  }

  deleteProduct() {
    if (this.productId != null) {
      this.productService.deleteProduct(this.productId).subscribe(
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

  LoadDataProductDetails() {
    if (this.productId !== null) {
      this.productService.LoadDataProductById(this.productId).subscribe(
        (data: any) => {
          console.log('Dados do produto carregados', data);
          this.nomeProduto = data.productName;
          this.descricao = data.description;
          this.categoria = data.category;
          this.precoCompra = data.purchasePrice.toString();
          this.quantidade = data.quantity.toString();
          this.dataValidade = new Date(data.expirationDate).toISOString().split('T')[0];
        },
        (error: any) => {
          console.error('Erro ao carregar os detalhes do produto', error);
        }
      );
    }
  }


  collectOptionsMeasure() {
    this.optionsMeasure = ['Unidade', 'Litro', 'Quilograma', 'Metro', 'Caixa', 'Pacote', 'Galão'];
  }
}
