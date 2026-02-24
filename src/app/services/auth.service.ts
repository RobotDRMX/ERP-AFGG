import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthState {
    user: {
        email: string;
        name: string;
    } | null;
    isAuthenticated: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly _state = signal<AuthState>({
        user: null,
        isAuthenticated: false
    });

    readonly state = this._state.asReadonly();
    readonly isAuthenticated = computed(() => this._state().isAuthenticated);
    readonly currentUser = computed(() => this._state().user);

    private readonly TEST_USER = {
        email: 'angelgomez@uteq.edu.mx',
        password: 'password123@',
        name: 'Angel Gómez'
    };

    constructor(private router: Router) {
        // Check localStorage on bootstrap if needed
        const saved = localStorage.getItem('erp_auth');
        if (saved) {
            this._state.set(JSON.parse(saved));
        }
    }

    login(email: string, password: string): boolean {
        if (email === this.TEST_USER.email && password === this.TEST_USER.password) {
            const newState = {
                isAuthenticated: true,
                user: { email: this.TEST_USER.email, name: this.TEST_USER.name }
            };
            this._state.set(newState);
            localStorage.setItem('erp_auth', JSON.stringify(newState));
            return true;
        }
        return false;
    }

    logout() {
        this._state.set({ user: null, isAuthenticated: false });
        localStorage.removeItem('erp_auth');
        this.router.navigate(['/landing-page']);
    }
}
