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
    templateUrl: './prices.component.html'
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
