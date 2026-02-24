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
    private fb = inject(FormBuilder);
    private router = inject(Router);

    isLoading = signal(false);
    registerForm: FormGroup;

    constructor() {
        this.registerForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(4)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, this.passwordValidator]],
            confirmPassword: ['', [Validators.required]],
            fullName: ['', [Validators.required]],
            address: ['', [Validators.required]],
            phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
            birthDate: [null, [Validators.required, this.ageValidator]]
        }, { validators: this.matchValidator });
    }

    passwordValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value || '';
        const hasMinLength = value.length >= 10;
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(value);

        if (!hasMinLength || !hasSpecialChar) {
            return { passwordInsecure: true };
        }
        return null;
    }

    matchValidator(group: AbstractControl): ValidationErrors | null {
        const pass = group.get('password')?.value;
        const confirm = group.get('confirmPassword')?.value;
        return pass === confirm ? null : { notMatching: true };
    }

    ageValidator(control: AbstractControl): ValidationErrors | null {
        if (!control.value) return null;
        const today = new Date();
        const birthDate = new Date(control.value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age >= 18 ? null : { underAge: true };
    }

    register() {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            return;
        }

        this.isLoading.set(true);
        setTimeout(() => {
            this.isLoading.set(false);
            this.router.navigate(['/auth/login']);
        }, 1500);
    }

    getError(field: string): boolean {
        const control = this.registerForm.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }
}
