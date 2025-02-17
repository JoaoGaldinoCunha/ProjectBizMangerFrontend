import { Component } from '@angular/core';
import { AlertsService } from '../../../../services/alerts/alerts.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-alerts',
  imports: [CommonModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export class AlertsComponent {
  mostOrderedProducts: any[] = [];
  lowQuantityProducts: any[] = [];
  intervalId: any;

  constructor(private alertsService: AlertsService) {}

  ngOnInit(): void {
    this.loadMostOrderedProducts();
    this.loadLowQuantityProducts();
  }

  loadMostOrderedProducts(): void {
    this.alertsService.LoadDataMostOrdered().subscribe((data: any) => {
      this.mostOrderedProducts = data;
    });
  }

  loadLowQuantityProducts(): void {
    this.alertsService.LoadDataLowQuantity().subscribe((data: any) => {
      this.lowQuantityProducts = data;
    });
  }

   
  startAutoRefresh() {
    this.intervalId = setInterval(() => {
        this.loadMostOrderedProducts();
        this.loadLowQuantityProducts();      
    }, 5000);
  }

  clearAutoRefresh() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
