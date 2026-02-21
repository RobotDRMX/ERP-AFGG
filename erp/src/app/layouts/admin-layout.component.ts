import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../components/header/header.component';

@Component({
    selector: 'app-admin-layout',
    imports: [RouterOutlet, RouterLink, RouterLinkActive, ButtonModule, HeaderComponent],
    template: `
    <div class="admin-layout">
      <app-header />
      <div class="admin-container">
        <aside class="admin-sidebar" [class.collapsed]="isCollapsed()">
          <div class="sidebar-header">
            <span class="sidebar-title">Administración</span>
            <p-button 
              icon="pi pi-bars" 
              [text]="true" 
              (onClick)="toggleSidebar()" 
              styleClass="toggle-btn" />
          </div>
          
          <nav class="sidebar-nav">
            <a routerLink="/admin-user" routerLinkActive="active" class="sidebar-link">
              <i class="pi pi-users"></i>
              <span class="link-text">Usuarios</span>
            </a>
            <a routerLink="/logs" routerLinkActive="active" class="sidebar-link">
              <i class="pi pi-history"></i>
              <span class="link-text">Logs del Sistema</span>
            </a>
            <a routerLink="/financial-summary" routerLinkActive="active" class="sidebar-link">
              <i class="pi pi-wallet"></i>
              <span class="link-text">Resumen Financiero</span>
            </a>
          </nav>
        </aside>

        <main class="admin-main">
          <div class="admin-content">
            <router-outlet />
          </div>
        </main>
      </div>
    </div>
  `,
    styles: [`
    .admin-layout {
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }
    .admin-container {
      display: flex;
      flex: 1;
      overflow: hidden;
    }
    .admin-sidebar {
      width: var(--sidebar-width);
      background: var(--color-surface);
      border-right: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
      transition: width 0.3s ease;
    }
    .admin-sidebar.collapsed {
      width: 80px;
    }
    .sidebar-header {
      padding: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--color-border);
    }
    .sidebar-title {
      font-weight: 700;
      color: var(--color-text);
      white-space: nowrap;
      overflow: hidden;
    }
    .admin-sidebar.collapsed .sidebar-title {
      display: none;
    }
    .sidebar-nav {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .sidebar-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 1rem;
      border-radius: var(--radius-sm);
      color: var(--color-text-muted);
      transition: var(--transition-fast);
      text-wrap: nowrap;
    }
    .sidebar-link i {
      font-size: 1.25rem;
    }
    .sidebar-link:hover, .sidebar-link.active {
      background: rgba(99, 102, 241, 0.1);
      color: var(--color-primary);
    }
    .admin-sidebar.collapsed .link-text {
      display: none;
    }
    .admin-main {
      flex: 1;
      overflow-y: auto;
      background: var(--color-bg);
      padding: 2rem;
    }
    .admin-content {
      max-width: 1400px;
      margin: 0 auto;
    }
  `]
})
export class AdminLayoutComponent {
    isCollapsed = signal(false);

    toggleSidebar() {
        this.isCollapsed.update(v => !v);
    }
}
