import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [CommonModule, DataViewModule, ButtonModule, TagModule, CardModule],
  template: `
    <div class="page-header mb-6">
      <h2>Lista de Precios</h2>
      <p>Consulte y actualice los precios de sus servicios.</p>
    </div>

    <p-dataView [value]="products" [layout]="'grid'">
      <ng-template pTemplate="grid" let-products>
        <div class="grid-auto-fit">
          @for (product of products; track product.id) {
            <p-card class="m-2">
              <div class="flex flex-col gap-4">
                <div class="flex-between">
                  <span class="text-sm text-muted">{{ product.category }}</span>
                  <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" />
                </div>
                <div class="text-center py-4">
                  <div class="font-bold text-2xl mb-1">{{ product.name }}</div>
                  <p class="m-0">{{ product.description }}</p>
                </div>
                <div class="flex-between">
                  <span class="font-bold text-2xl text-primary">{{ product.price | currency:'USD' }}</span>
                  <p-button icon="pi pi-shopping-cart" [rounded]="true" />
                </div>
              </div>
            </p-card>
          }
        </div>
      </ng-template>
    </p-dataView>
  `
})
export default class PricesComponent {
  products = [
    { id: 1, name: 'Suscripción Silver', description: 'Plan básico empresarial', price: 99.99, category: 'SaaS', inventoryStatus: 'INSTOCK' },
    { id: 2, name: 'Suscripción Gold', description: 'Plan avanzado con soporte', price: 199.99, category: 'SaaS', inventoryStatus: 'INSTOCK' },
    { id: 3, name: 'Módulo de IA', description: 'Extensión de inteligencia artificial', price: 49.99, category: 'Add-on', inventoryStatus: 'LOWSTOCK' },
    { id: 4, name: 'Consultoría Especializada', description: '10 horas de consultoría', price: 500, category: 'Service', inventoryStatus: 'OUTOFSTOCK' }
  ];

  getSeverity(status: string): "success" | "warn" | "danger" | "secondary" {
    switch (status) {
      case 'INSTOCK': return 'success';
      case 'LOWSTOCK': return 'warn';
      case 'OUTOFSTOCK': return 'danger';
      default: return 'secondary';
    }
  }
}
