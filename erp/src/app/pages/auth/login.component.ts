import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CardModule, InputTextModule, PasswordModule, ButtonModule, FloatLabelModule, CheckboxModule, DividerModule, MessageModule],
  template: `
    <div class="auth-card-container">
      <div class="auth-card-glass">
        <div class="auth-header text-center mb-6">
          <div class="auth-logo mb-3">
             <i class="pi pi-prime"></i>
          </div>
          <h2 class="mb-1">Bienvenido de nuevo</h2>
          <p class="text-sm text-muted">Ingresa tus credenciales para acceder a tu panel</p>
        </div>

        @if (errorMessage()) {
          <div class="mb-4">
            <p-message severity="error" [text]="errorMessage()" styleClass="w-full" />
          </div>
        }

        <form (ngSubmit)="login()" class="flex flex-col gap-6">
          <p-floatLabel>
            <input pInputText id="email" type="email" [(ngModel)]="email" name="email" class="w-full auth-input" required />
            <label for="email">Correo Electrónico</label>
          </p-floatLabel>

          <p-floatLabel>
            <p-password 
              [(ngModel)]="password" 
              name="password" 
              [toggleMask]="true" 
              [feedback]="false" 
              inputStyleClass="w-full auth-input" 
              styleClass="w-full" />
            <label for="password">Contraseña</label>
          </p-floatLabel>

          <div class="flex-between">
            <div class="flex-center gap-2">
              <p-checkbox [(ngModel)]="remember" [binary]="true" inputId="remember" name="remember" />
              <label for="remember" class="text-xs cursor-pointer text-muted">Recordarme</label>
            </div>
            <a href="#" class="text-xs text-primary font-semibold">¿Olvidaste tu contraseña?</a>
          </div>

          <p-button label="Iniciar Sesión" type="submit" [loading]="isLoading()" styleClass="w-full p-3 font-bold" />
        </form>

        <p-divider align="center">
            <span class="text-xs text-muted">O continúa con</span>
        </p-divider>

        <div class="social-login gap-3 flex">
           <p-button icon="pi pi-google" severity="secondary" [outlined]="true" styleClass="w-full" label="Google" />
           <p-button icon="pi pi-github" severity="secondary" [outlined]="true" styleClass="w-full" label="GitHub" />
        </div>

        <div class="text-center mt-8">
          <p class="text-sm">
            ¿No tienes una cuenta? 
            <a routerLink="/auth/register" class="font-bold text-primary hover:underline">Regístrate gratis</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-card-container {
      width: 100%;
      max-width: 440px;
      animation: slideUp 0.6s ease-out;
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .auth-card-glass {
      background: rgba(30, 41, 59, 0.7);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      padding: 3rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }

    .auth-logo {
      width: 48px;
      height: 48px;
      background: var(--color-primary);
      color: white;
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      box-shadow: 0 8px 16px rgba(99, 102, 241, 0.4);
    }

    .auth-header h2 {
      font-size: 1.75rem;
      letter-spacing: -0.02em;
    }

    :host ::ng-deep .auth-input {
      background: rgba(15, 23, 42, 0.5) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      padding: 0.85rem !important;
    }

    :host ::ng-deep .auth-input:focus {
      border-color: var(--color-primary) !important;
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15) !important;
    }
  `]
})
export default class LoginComponent {
  auth = inject(AuthService);
  router = inject(Router);

  email = '';
  password = '';
  remember = false;
  isLoading = signal(false);
  errorMessage = signal('');

  login() {
    this.errorMessage.set('');
    this.isLoading.set(true);

    setTimeout(() => {
      const success = this.auth.login(this.email, this.password);
      this.isLoading.set(false);

      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage.set('Credenciales inválidas. Verifica tu correo y contraseña.');
      }
    }, 1000);
  }
}
