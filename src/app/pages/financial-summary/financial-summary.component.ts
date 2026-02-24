import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';

@Component({
    selector: 'app-financial-summary',
    standalone: true,
    imports: [CommonModule, CardModule, ChartModule],
    templateUrl: './financial-summary.component.html'
})
export default class FinancialSummaryComponent {
    basicData = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
            {
                label: 'Ingresos',
                backgroundColor: '#6366f1',
                data: [65000, 59000, 80000, 81000, 56000, 55000]
            },
            {
                label: 'Egresos',
                backgroundColor: '#f97316',
                data: [28000, 48000, 40000, 19000, 86000, 27000]
            }
        ]
    };

    basicOptions = {
        plugins: {
            legend: { labels: { color: '#94a3b8' } }
        },
        scales: {
            x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.1)' } },
            y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.1)' } }
        }
    };

    pieData = {
        labels: ['Nómina', 'Infraestructura', 'Marketing', 'Legal'],
        datasets: [
            {
                data: [540, 325, 702, 421],
                backgroundColor: ['#6366f1', '#0ea5e9', '#f59e0b', '#ef4444'],
                hoverBackgroundColor: ['#4f46e5', '#0284c7', '#d97706', '#dc2626']
            }
        ]
    };

    pieOptions = {
        plugins: {
            legend: { labels: { color: '#94a3b8' } }
        }
    };
}
