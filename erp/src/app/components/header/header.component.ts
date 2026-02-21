import { Component, output, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonModule, AvatarModule, BadgeModule, OverlayBadgeModule, TooltipModule],
  template: `
    <header class="erp-header">
      <div class="header-brand" routerLink="/landing-page" style="cursor: pointer;">
        <i class="pi pi-prime header-logo-icon"></i>
        <span class="header-brand-name">ERP<span class="brand-accent">Pro</span></span>
      </div>

      <nav class="header-nav">
        @if (auth.isAuthenticated()) {
          <a routerLink="/dashboard"         routerLinkActive="active" class="nav-link"><i class="pi pi-home"></i> Dashboard</a>
          <a routerLink="/financial-summary" routerLinkActive="active" class="nav-link"><i class="pi pi-chart-bar"></i> Finanzas</a>
          <a routerLink="/prices"            routerLinkActive="active" class="nav-link"><i class="pi pi-tag"></i> Precios</a>
          <a routerLink="/logs"              routerLinkActive="active" class="nav-link"><i class="pi pi-list"></i> Logs</a>
        } @else {
          <a routerLink="/landing-page"      routerLinkActive="active" class="nav-link">Inicio</a>
          <a href="#" class="nav-link">Características</a>
          <a href="#" class="nav-link">Soluciones</a>
        }
      </nav>

      <div class="header-actions">
        @if (auth.isAuthenticated()) {
          <p-button
            icon="pi pi-bell"
            severity="secondary"
            [rounded]="true"
            [text]="true"
            (onClick)="notificationClick.emit()"
            aria-label="Notificaciones"
          />

          <p-avatar
            [label]="auth.currentUser()?.name?.substring(0,2) || 'U'"
            shape="circle"
            class="user-avatar"
            styleClass="cursor-pointer"
            (click)="auth.logout()"
            pTooltip="Cerrar Sesión"
            tooltipPosition="bottom"
          />
        } @else {
          <p-button label="Iniciar Sesión" icon="pi pi-sign-in" severity="primary" [outlined]="true" routerLink="/auth/login" />
          <p-button label="Registrarse" icon="pi pi-user-plus" severity="primary" routerLink="/auth/register" />
        }
      </div>
    </header>
  `,
  styles: [`
    .erp-header {
      position: sticky;
      top: 0;
      z-index: 100;
      height: var(--header-height);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.5rem;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--color-border);
    }

    .header-brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .header-logo-icon {
      font-size: 1.75rem;
      color: var(--color-primary);
    }

    .header-brand-name {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--color-text);
      letter-spacing: -0.03em;
    }

    .brand-accent { color: var(--color-primary); }

    .header-nav {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.45rem 0.9rem;
      border-radius: var(--radius-sm);
      color: var(--color-text-muted);
      font-size: 0.875rem;
      font-weight: 500;
      transition: var(--transition-fast);
    }

    .nav-link:hover, .nav-link.active {
      color: var(--color-primary);
      background: rgba(99, 102, 241, 0.1);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .user-avatar {
      cursor: pointer;
    }

    @media (max-width: 768px) {
      .header-nav { display: none; }
    }
  `]
})
export class HeaderComponent {
  auth = inject(AuthService);
  notificationClick = output<void>();
}
