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
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterLink, FormsModule, CardModule, InputTextModule, PasswordModule, ButtonModule, FloatLabelModule, CheckboxModule, DividerModule, MessageModule],
    templateUrl: './login.component.html'
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
                this.router.navigate(['/group']);
            } else {
                this.errorMessage.set('Credenciales inválidas. Verifica tu correo y contraseña.');
            }
        }, 1000);
    }
}
