import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, CardModule, InputTextModule, PasswordModule, ButtonModule, FloatLabelModule, DividerModule, MessageModule],
  template: `
    <div class="auth-card-container">
      <div class="auth-card-glass">
        <div class="auth-header text-center mb-6">
          <div class="auth-logo mb-3">
             <i class="pi pi-user-plus"></i>
          </div>
          <h2 class="mb-1">Crea tu cuenta</h2>
          <p class="text-sm text-muted">Únete para empezar a gestionar tu empresa Pro</p>
        </div>

        <form (ngSubmit)="register()" class="flex flex-col gap-6">
          <p-floatLabel>
            <input pInputText id="fullname" type="text" [(ngModel)]="name" name="name" class="w-full auth-input" required />
            <label for="fullname">Nombre Completo</label>
          </p-floatLabel>

          <p-floatLabel>
            <input pInputText id="email" type="email" [(ngModel)]="email" name="email" class="w-full auth-input" required />
            <label for="email">Correo Electrónico</label>
          </p-floatLabel>

          <p-floatLabel>
            <p-password 
              [(ngModel)]="password" 
              name="password" 
              [toggleMask]="true" 
              inputStyleClass="w-full auth-input" 
              styleClass="w-full"
              promptLabel="Escribe una contraseña"
              weakLabel="Débil"
              mediumLabel="Media"
              strongLabel="Fuerte" />
            <label for="password">Contraseña</label>
          </p-floatLabel>

          <div class="terms-check flex gap-2">
            <span class="text-xs text-muted">Al registrarte, aceptas nuestros 
               <a href="#" class="text-primary hover:underline">Términos de Servicio</a> y 
               <a href="#" class="text-primary hover:underline">Privacidad</a>.
            </span>
          </div>

          <p-button label="Crear Cuenta" type="submit" [loading]="isLoading()" styleClass="w-full p-3 font-bold" />
        </form>

        <p-divider align="center">
            <span class="text-xs text-muted">También puedes</span>
        </p-divider>

        <div class="social-login gap-3 flex">
           <p-button icon="pi pi-google" severity="secondary" [outlined]="true" styleClass="w-full" label="Google" />
        </div>

        <div class="text-center mt-8">
          <p class="text-sm">
            ¿Ya tienes una cuenta? 
            <a routerLink="/auth/login" class="font-bold text-primary hover:underline">Inicia sesión</a>
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
export default class RegisterComponent {
  name = '';
  email = '';
  password = '';
  isLoading = signal(false);

  constructor(private router: Router) { }

  register() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.router.navigate(['/auth/login']);
    }, 1500);
  }
}
