import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-auth-layout',
    standalone: true,
    imports: [RouterOutlet],
    template: `
    <div class="auth-layout">
      <div class="auth-gradient-bg"></div>
      <div class="auth-content">
        <router-outlet />
      </div>
      <div class="auth-footer">
        <p>&copy; 2026 ERP Pro. Todos los derechos reservados.</p>
      </div>
    </div>
  `,
    styles: [`
    .auth-layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      background-color: var(--color-bg);
    }
    .auth-gradient-bg {
      position: absolute;
      top: -10%;
      right: -10%;
      width: 50%;
      height: 50%;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
      filter: blur(80px);
      z-index: 0;
    }
    .auth-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      z-index: 1;
    }
    .auth-footer {
      padding: 1.5rem;
      text-align: center;
      font-size: 0.8rem;
      color: var(--color-text-muted);
      z-index: 1;
    }
  `]
})
export class AuthLayoutComponent { }
