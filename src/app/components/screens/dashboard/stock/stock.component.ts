import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ModalNewStockComponent } from '../../../modals/modal-new-stock/modal-new-stock.component';
import { ModalStockNewProductComponent } from '../../../modals/modal-stock-new-product/modal-stock-new-product.component';
import { ModalStockEditProductQuantityComponent } from '../../../modals/modal-stock-edit-product-quantity/modal-stock-edit-product-quantity.component';
import { ModalStockEditProductComponent } from '../../../modals/modal-stock-edit-product/modal-stock-edit-product.component';
import { LoginService } from '../../../../services/login/login.service';
import { StockService } from '../../../../services/stock/stock.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../services/product/product.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  imports: [ModalStockNewProductComponent, ModalStockEditProductComponent, ModalStockEditProductQuantityComponent, ModalNewStockComponent, CommonModule, FormsModule]
})
export class StockComponent implements OnInit, OnDestroy {

  tipoUsuario: string;
  dataAllStocks: any[] = [];
  selectedStock: string | null = null;
  dataAllProducts: any[] = [];
  stockId: number;
  intervalId: any;
  name: string = '';

  constructor(
    private loginService: LoginService,
    private stockService: StockService,
    private productService: ProductService
  ) {
    this.tipoUsuario = '';
    this.stockId = 0;
  }

  ngOnInit(): void {
    this.LoadDataAllStocks();
    this.tipoUsuario = this.loginService.role;
    this.startAutoRefresh();
  }

  ngOnDestroy(): void {
    this.clearAutoRefresh();
  }

  selectStock(stock: string, stockId: number): void {
    this.selectedStock = stock;
    this.stockId = stockId;
    console.log(`Selected stock: ${stock}`);
    this.loadDataAllProductsInStock(stockId);
  }

  @ViewChild(ModalNewStockComponent) modalNewStockComponent!: ModalNewStockComponent;
  openNewStockModal() {
    this.modalNewStockComponent.openModal();
  }

  @ViewChild(ModalStockNewProductComponent) modalStockNewProductComponent!: ModalStockNewProductComponent;
  openNewProductModal() {
    this.modalStockNewProductComponent.stockId = this.stockId;
    this.modalStockNewProductComponent.openModal();
  }

  @ViewChild(ModalStockEditProductComponent) modalStockEditProductComponent!: ModalStockEditProductComponent;
  openEditProductModal(productId: number) {
    this.modalStockEditProductComponent.stockId = this.stockId;
    this.modalStockEditProductComponent.productId = productId;
    this.modalStockEditProductComponent.openModal();
  }

  @ViewChild(ModalStockEditProductQuantityComponent) modalStockEditProductQuantityComponent!: ModalStockEditProductQuantityComponent;
  openEditProductQuantityModal(productId: number) {
    this.modalStockEditProductQuantityComponent.productId = productId;
    this.modalStockEditProductQuantityComponent.openModal();
  }

  LoadDataAllStocks() {
    this.stockService.loadDataAllStocks().subscribe(
      (data: any) => {
        this.dataAllStocks = data;
        if (this.dataAllStocks.length > 0) {
          const currentStock = this.dataAllStocks.find(stock => stock.id === this.stockId);
          if (currentStock) {
            this.selectStock(currentStock.name, currentStock.id);
          } else {
            this.selectStock(this.dataAllStocks[0].name, this.dataAllStocks[0].id);
          }
        }
      },
      (error: any) => {
        console.error('Error loading stocks data', error);
      }
    );
  }

  loadDataAllProductsInStock(stockId: number) {
    this.productService.LoadDataAllProductsInStock(stockId).subscribe(
      (data: any) => {
        this.dataAllProducts = data;
      },
      (error: any) => {
        console.error('Error loading products data', error);
      }
    );
  }

  loadDataProductsByName(): void {
    if (this.stockId) {
      console.log(this.stockId);
      if (this.name.trim() === '') {
        this.loadDataAllProductsInStock(this.stockId);
      } else {
        this.productService.LoadDataProdcutByIdStockAndProduct(this.stockId, this.name).subscribe(
          (data: any) => {
            this.dataAllProducts = data.map((product: any) => ({
              id: product.id,
              name: product.name,
              description: product.description,
              category: product.category,
              quantity: product.quantity
            }));
          },
          (error: any) => {
            console.error('Erro ao carregar os dados dos produtos', error);
          }
        );
      }
    } else {
      this.loadDataAllProductsInStock(this.stockId);
    }
  }

  startAutoRefresh() {
    this.intervalId = setInterval(() => {
      if (!this.name.trim()) {
        this.loadDataAllProductsInStock(this.stockId);
        this.LoadDataAllStocks();
      }
    }, 5000);
  }

  clearAutoRefresh() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
