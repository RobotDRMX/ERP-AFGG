import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        ReactiveFormsModule,
        CardModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        FloatLabelModule,
        DividerModule,
        MessageModule,
        DatePickerModule,
        InputNumberModule
    ],
    templateUrl: './register.component.html'
})
export default class RegisterComponent {
    private fb          = inject(FormBuilder);
    private router      = inject(Router);
    private authService = inject(AuthService);

    isLoading    = signal(false);
    errorMessage = signal('');
    registerForm: FormGroup;

    constructor() {
        this.registerForm = this.fb.group({
            username:        ['', [Validators.required, Validators.minLength(4), this.noSpaceValidator]],
            email:           ['', [Validators.required, Validators.email]],
            password:        ['', [Validators.required, this.passwordValidator]],
            confirmPassword: ['', [Validators.required]],
            fullName:        ['', [Validators.required, this.noWhitespaceValidator]],
            address:         ['', [Validators.required]],
            phone:           ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
            birthDate:       [null, [Validators.required, this.ageValidator]]
        }, { validators: this.matchValidator });
    }

    noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
        const value = (control.value ?? '').toString();
        return value.trim().length > 0 ? null : { whitespace: true };
    }

    noSpaceValidator(control: AbstractControl): ValidationErrors | null {
        const value = (control.value ?? '').toString();
        return /\s/.test(value) ? { hasSpace: true } : null;
    }

    passwordValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value || '';
        const hasMinLength   = value.length >= 8;
        const hasUppercase   = /[A-Z]/.test(value);
        const hasNumber      = /[0-9]/.test(value);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(value);
        return hasMinLength && hasUppercase && hasNumber && hasSpecialChar ? null : { passwordInsecure: true };
    }

    matchValidator(group: AbstractControl): ValidationErrors | null {
        const pass    = group.get('password')?.value;
        const confirm = group.get('confirmPassword')?.value;
        return pass === confirm ? null : { notMatching: true };
    }

    ageValidator(control: AbstractControl): ValidationErrors | null {
        if (!control.value) return null;
        const today     = new Date();
        const birthDate = new Date(control.value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 18 ? null : { underAge: true };
    }

    onPhoneInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        input.value = input.value.replace(/[^0-9]/g, '').slice(0, 10);
        this.registerForm.get('phone')?.setValue(input.value, { emitEvent: false });
    }

    getFieldError(field: string): string {
        const control = this.registerForm.get(field);
        if (!control?.errors) return '';
        if (control.errors['required'])         return 'Este campo es requerido';
        if (control.errors['whitespace'])       return 'No puede contener solo espacios';
        if (control.errors['hasSpace'])         return 'No puede contener espacios';
        if (control.errors['minlength'])        return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
        if (control.errors['pattern'])          return field === 'phone' ? 'Debe tener exactamente 10 dígitos' : 'Formato inválido';
        if (control.errors['email'])            return 'Correo electrónico inválido';
        if (control.errors['passwordInsecure']) return 'Min. 8 caracteres, mayúscula, número y símbolo especial';
        if (control.errors['underAge'])         return 'Debes ser mayor de edad (18+)';
        return 'Campo inválido';
    }

    register() {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            return;
        }

        this.errorMessage.set('');
        this.isLoading.set(true);

        const { fullName, username, email, phone, address, birthDate, password } = this.registerForm.value;

        setTimeout(() => {
            const result = this.authService.register({
                name: fullName,
                username,
                email,
                phone,
                address,
                birthDate,
                password
            });

            this.isLoading.set(false);

            if (result.ok) {
                this.router.navigate(['/auth/login']);
            } else {
                this.errorMessage.set(result.error ?? 'Error al registrar usuario.');
            }
        }, 800);
    }

    getError(field: string): boolean {
        const control = this.registerForm.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }
}
