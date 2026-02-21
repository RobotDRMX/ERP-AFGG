import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'app-footer',
    imports: [RouterLink, DividerModule],
    template: `
    <footer class="erp-footer">
      <p-divider />
      <div class="footer-inner">
        <span class="footer-brand">
          <i class="pi pi-prime"></i> ERP<span class="brand-accent">Pro</span>
          <span class="footer-year">&copy; {{ currentYear }}</span>
        </span>

        <nav class="footer-links">
          <a routerLink="/landing-page" class="footer-link">Inicio</a>
          <span class="footer-sep">·</span>
          <a routerLink="/dashboard"    class="footer-link">Dashboard</a>
          <span class="footer-sep">·</span>
          <a routerLink="/logs"         class="footer-link">Logs</a>
        </nav>

        <span class="footer-version">v0.1.0 — Angular + PrimeNG</span>
      </div>
    </footer>
  `,
    styles: [`
    .erp-footer {
      padding: 0 1.5rem;
    }

    .footer-inner {
      height: var(--footer-height);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 0.5rem;
      font-size: 0.8rem;
    }

    .footer-brand {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-weight: 600;
      color: var(--color-text);
    }

    .footer-brand .pi { color: var(--color-primary); }
    .brand-accent { color: var(--color-primary); }
    .footer-year  { color: var(--color-text-muted); margin-left: 0.25rem; }

    .footer-links {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .footer-link {
      color: var(--color-text-muted);
      font-size: 0.8rem;
      transition: var(--transition-fast);
    }

    .footer-link:hover { color: var(--color-primary); }

    .footer-sep   { color: var(--color-border); }
    .footer-version { color: var(--color-text-muted); font-size: 0.75rem; }
  `]
})
export class FooterComponent {
    readonly currentYear = new Date().getFullYear();
}
