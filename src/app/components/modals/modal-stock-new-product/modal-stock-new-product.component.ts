import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product/product.service';
import { TbProduct } from '../../../models/tb-product';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-modal-stock-new-product',
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-stock-new-product.component.html',
  styleUrl: './modal-stock-new-product.component.css'
})
export class ModalStockNewProductComponent {
  @Input() stockId: number | null = null;

  constructor(private productService: ProductService) { }

  display = 'none';
  nomeProduto = '';
  descricao = '';
  categoria = '';
  precoCompra = '';
  quantidade = '';
  unidade = '';
  dataValidade = '';

  valorLimite = '5';
  items = [{
    name: '',
  }];
  optionsMeasure: string[] = [];

  ngOnInit() {
    this.collectOptionsMeasure();
  }

  openModal() {
    this.display = 'flex';
  }

  closeModal() {
    this.display = 'none';
  }

  addItem() {
    this.items.push({
      name: '',
    });
  }

  removeLastItem() {
    if (this.items.length > 1) {
      this.items.pop();
    }
  }

  addProduct(): void {
    const productData: TbProduct = {
      name: this.nomeProduto,
      description: this.descricao,
      category: this.categoria,
      expirationDate: new Date(this.dataValidade),
      purchasePrice: Number(this.precoCompra),
      quantity: Number(this.quantidade),
      stock: {
        id: this.stockId ? this.stockId : 0
      }
    };

    this.productService.createProduct(productData).subscribe(
      response => {
        console.log('Produto criado com sucesso:', response);
      },
      error => {
        console.error('Erro ao criar o produto:', error);
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



  collectOptionsMeasure() {
    this.optionsMeasure = ['Unidade', 'Litro', 'Quilograma', 'Metro', 'Caixa', 'Pacote', 'Galão'];
  }
}
