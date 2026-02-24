import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-logs',
    standalone: true,
    imports: [CommonModule, TimelineModule, CardModule, TagModule],
    templateUrl: './logs.component.html'
})
export default class LogsComponent {
    events = [
        { status: 'Login de Usuario', date: '20/02/2026 18:00', icon: 'pi pi-sign-in', color: '#6366f1', description: 'El administrador ha iniciado sesión desde IP 192.168.1.1', category: 'SECURITY' },
        { status: 'Actualización de Inventario', date: '20/02/2026 16:30', icon: 'pi pi-box', color: '#f97316', description: 'Se han actualizado los precios de 45 productos.', category: 'INVENTORY' },
        { status: 'Error de Conexión', date: '20/02/2026 14:15', icon: 'pi pi-exclamation-triangle', color: '#ef4444', description: 'Fallo en la sincronización con la API de facturación.', category: 'ERROR' },
        { status: 'Nuevo Lote Procesado', date: '20/02/2026 12:00', icon: 'pi pi-check', color: '#22c55e', description: 'El lote OB-001 se completó exitosamente.', category: 'SYSTEM' }
    ];
}
