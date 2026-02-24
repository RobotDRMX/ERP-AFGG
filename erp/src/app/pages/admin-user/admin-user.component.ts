import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-admin-user',
    standalone: true,
    imports: [CommonModule, TableModule, TagModule, ButtonModule, InputTextModule, CardModule],
    templateUrl: './admin-user.component.html'
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
