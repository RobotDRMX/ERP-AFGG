import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule, TagModule, AvatarModule, DividerModule],
    templateUrl: './user.component.html'
})
export default class UserComponent {
    userService = inject(UsersService);

    getRoleSeverity(role: string): 'success' | 'info' | 'secondary' {
        switch (role) {
            case 'admin':   return 'success';
            case 'manager': return 'info';
            default:        return 'secondary';
        }
    }

    getRoleLabel(role: string): string {
        switch (role) {
            case 'admin':   return 'Administrador';
            case 'manager': return 'Manager';
            default:        return 'Viewer';
        }
    }

    getInitials(name: string): string {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
}
