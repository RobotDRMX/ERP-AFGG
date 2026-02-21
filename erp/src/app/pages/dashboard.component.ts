import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { OutgoingBatchService } from '../services/outgoing-batch.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule],
    template: `
    <div class="dashboard-header mb-6">
      <h2>Panel de Control</h2>
      <p>Resumen general de las operaciones del sistema.</p>
    </div>

    <div class="grid-auto-fit mb-8">
      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(99, 102, 241, 0.2); color: var(--color-primary);">
          <i class="pi pi-box"></i>
        </div>
        <div class="stat-value">{{ batchService.totalCount() }}</div>
        <div class="stat-label">Lotes Totales</div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(249, 115, 22, 0.2); color: var(--color-warning);">
          <i class="pi pi-sync"></i>
        </div>
        <div class="stat-value">{{ batchService.pendingCount() }}</div>
        <div class="stat-label">Lotes Pendientes</div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(34, 197, 94, 0.2); color: var(--color-success);">
          <i class="pi pi-check-circle"></i>
        </div>
        <div class="stat-value">{{ batchService.completedCount() }}</div>
        <div class="stat-label">Lotes Completados</div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(239, 68, 68, 0.2); color: var(--color-danger);">
          <i class="pi pi-times-circle"></i>
        </div>
        <div class="stat-value">{{ batchService.failedCount() }}</div>
        <div class="stat-label">Lotes Fallidos</div>
      </div>
    </div>

    <div class="grid-auto-fit">
      <p-card header="Actividad Reciente" class="h-full">
        <ul class="activity-list">
          @for (batch of batchService.batches(); track batch.id) {
            <li class="activity-item">
              <div class="activity-info">
                <span class="activity-title">{{ batch.description }}</span>
                <span class="activity-date">{{ batch.createdAt | date:'short' }}</span>
              </div>
              <div class="activity-status" [class]="batch.status">
                {{ batch.status | uppercase }}
              </div>
            </li>
          }
        </ul>
      </p-card>

      <p-card header="Atajos" class="h-full">
        <div class="flex flex-col gap-2">
          <p-button label="Nuevo Usuario" icon="pi pi-user-plus" severity="secondary" [text]="true" styleClass="w-full text-left" />
          <p-button label="Exportar Reporte" icon="pi pi-file-export" severity="secondary" [text]="true" styleClass="w-full text-left" />
          <p-button label="Configuración" icon="pi pi-cog" severity="secondary" [text]="true" styleClass="w-full text-left" />
        </div>
      </p-card>
    </div>
  `,
    styles: [`
    .activity-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .activity-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid var(--color-border);
    }
    .activity-item:last-child {
      border-bottom: none;
    }
    .activity-info {
      display: flex;
      flex-direction: column;
    }
    .activity-title {
      font-weight: 500;
      color: var(--color-text);
    }
    .activity-date {
      font-size: 0.8rem;
      color: var(--color-text-muted);
    }
    .activity-status {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 700;
    }
    .activity-status.completed { background: rgba(34, 197, 94, 0.2); color: #22c55e; }
    .activity-status.pending { background: rgba(249, 115, 22, 0.2); color: #f97316; }
    .activity-status.processing { background: rgba(14, 165, 233, 0.2); color: #0ea5e9; }
    .activity-status.failed { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
  `]
})
export default class DashboardComponent {
    batchService = inject(OutgoingBatchService);
}
