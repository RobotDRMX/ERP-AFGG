import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-class-layout',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, ButtonModule, MenuModule, AvatarModule],
    templateUrl: './class-layout.component.html'
})
export class ClassLayoutComponent {
    private readonly authService = inject(AuthService);
    isCollapsed = signal(false);

    currentUser = this.authService.currentUser;
    readonly appVersion = '1.0.0';

    items: MenuItem[] = [
        {
            label: 'Navegación',
            items: [
                { label: 'Grupos', icon: 'pi pi-users', routerLink: '/group' },
                { label: 'Usuarios', icon: 'pi pi-user', routerLink: '/user' }
            ]
        }
    ];

    toggleSidebar() {
        this.isCollapsed.update(v => !v);
    }

    logout() {
        this.authService.logout();
    }
}
