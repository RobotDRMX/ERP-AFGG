import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-logs',
    standalone: true,
    imports: [CommonModule, TimelineModule, CardModule, TagModule],
    template: `
    <div class="page-header mb-6">
      <h2>Logs del Sistema</h2>
      <p>Historial de eventos y auditoría.</p>
    </div>

    <div class="p-4">
      <p-timeline [value]="events" align="alternate" styleClass="customized-timeline">
        <ng-template pTemplate="marker" let-event>
          <span class="custom-marker shadow-2" [style.backgroundColor]="event.color">
            <i [class]="event.icon"></i>
          </span>
        </ng-template>
        <ng-template pTemplate="content" let-event>
          <p-card [header]="event.status" [subheader]="event.date">
            <p>{{ event.description }}</p>
            <p-tag [value]="event.category" severity="secondary" />
          </p-card>
        </ng-template>
      </p-timeline>
    </div>
  `,
    styles: [`
    .custom-marker {
      display: flex;
      width: 2rem;
      height: 2rem;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      border-radius: 50%;
      z-index: 1;
    }
    :host ::ng-deep .p-timeline-event-content,
    :host ::ng-deep .p-timeline-event-opposite {
      line-height: 1;
    }
    @media screen and (max-width: 960px) {
      :host ::ng-deep .customized-timeline .p-timeline-event:nth-child(even) {
        flex-direction: row !important;
      }
      :host ::ng-deep .customized-timeline .p-timeline-event:nth-child(even) .p-timeline-event-content {
        text-align: left !important;
      }
      :host ::ng-deep .customized-timeline .p-timeline-event-opposite {
        flex: 0;
      }
    }
  `]
})
export default class LogsComponent {
    events = [
        { status: 'Login de Usuario', date: '20/02/2026 18:00', icon: 'pi pi-sign-in', color: '#6366f1', description: 'El administrador ha iniciado sesión desde IP 192.168.1.1', category: 'SECURITY' },
        { status: 'Actualización de Inventario', date: '20/02/2026 16:30', icon: 'pi pi-box', color: '#f97316', description: 'Se han actualizado los precios de 45 productos.', category: 'INVENTORY' },
        { status: 'Error de Conexión', date: '20/02/2026 14:15', icon: 'pi pi-exclamation-triangle', color: '#ef4444', description: 'Fallo en la sincronización con la API de facturación.', category: 'ERROR' },
        { status: 'Nuevo Lote Procesado', date: '20/02/2026 12:00', icon: 'pi pi-check', color: '#22c55e', description: 'El lote OB-001 se completó exitosamente.', category: 'SYSTEM' }
    ];
}
