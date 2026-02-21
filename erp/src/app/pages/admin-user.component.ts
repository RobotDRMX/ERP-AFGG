import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UsersService } from '../services/users.service';

import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule, InputTextModule, CardModule],
  template: `
    <div class="page-header flex-between mb-6">
      <div>
        <h2>Usuarios</h2>
        <p>Administre los accesos y roles de su empresa.</p>
      </div>
      <p-button label="Nuevo Usuario" icon="pi pi-plus" />
    </div>

    <p-card>
      <p-table 
        [value]="userService.users()" 
        [paginator]="true" 
        [rows]="10" 
        [tableStyle]="{ 'min-width': '50rem' }"
        styleClass="p-datatable-sm">
        <ng-template pTemplate="header">
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Fecha Registro</th>
            <th style="width: 8rem">Acciones</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-user>
          <tr>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <p-tag [value]="user.role.toUpperCase()" [severity]="getRoleSeverity(user.role)" />
            </td>
            <td>
              <p-tag [value]="user.active ? 'ACTIVO' : 'INACTIVO'" [severity]="user.active ? 'success' : 'danger'" />
            </td>
            <td>{{ user.createdAt | date:'shortDate' }}</td>
            <td>
              <div class="flex gap-2">
                <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" severity="secondary" />
                <p-button 
                  [icon]="user.active ? 'pi pi-user-minus' : 'pi pi-user-plus'" 
                  [rounded]="true" 
                  [text]="true" 
                  [severity]="user.active ? 'danger' : 'success'" 
                  (onClick)="userService.toggleActive(user.id)" />
              </div>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </p-card>
  `
})
export default class AdminUserComponent {
  userService = inject(UsersService);

  getRoleSeverity(role: string): "success" | "secondary" | "info" {
    switch (role) {
      case 'admin': return 'success';
      case 'manager': return 'info';
      default: return 'secondary';
    }
  }
}
