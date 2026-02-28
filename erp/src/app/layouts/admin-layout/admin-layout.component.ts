import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, ButtonModule, HeaderComponent],
    templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent {
    isCollapsed = signal(false);

    toggleSidebar() {
        this.isCollapsed.update(v => !v);
    }
}
