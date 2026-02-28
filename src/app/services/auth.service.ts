import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

export interface RegisteredUser {
    email: string;
    name: string;
    username: string;
    phone: string;
    address: string;
    birthDate: Date;
    password: string;
}

export interface AuthState {
    user: { email: string; name: string } | null;
    isAuthenticated: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    // ── In-memory users store ──────────────────────────────────────────────────
    private readonly _users: RegisteredUser[] = [
        {
            email: 'prueba@gmail.com',
            name: 'Usuario Prueba',
            username: 'prueba',
            phone: '5512345678',
            address: 'Ciudad de México',
            birthDate: new Date('1995-06-15'),
            password: 'password123!'
        }
    ];

    // ── Auth session state ─────────────────────────────────────────────────────
    private readonly _state = signal<AuthState>({
        user: null,
        isAuthenticated: false
    });

    readonly isAuthenticated = computed(() => this._state().isAuthenticated);
    readonly currentUser     = computed(() => this._state().user);

    constructor(private router: Router) {
        const saved = localStorage.getItem('erp_auth');
        if (saved) {
            this._state.set(JSON.parse(saved));
        }
    }

    // ── Login ──────────────────────────────────────────────────────────────────
    login(email: string, password: string): boolean {
        const found = this._users.find(
            u => u.email === email && u.password === password
        );

        if (found) {
            const newState: AuthState = {
                isAuthenticated: true,
                user: { email: found.email, name: found.name }
            };
            this._state.set(newState);
            localStorage.setItem('erp_auth', JSON.stringify(newState));
            return true;
        }
        return false;
    }

    // ── Register ───────────────────────────────────────────────────────────────
    register(data: RegisteredUser): { ok: boolean; error?: string } {
        const emailTaken    = this._users.some(u => u.email    === data.email);
        const usernameTaken = this._users.some(u => u.username === data.username);

        if (emailTaken)    return { ok: false, error: 'El correo ya está registrado.' };
        if (usernameTaken) return { ok: false, error: 'El nombre de usuario ya está en uso.' };

        this._users.push({ ...data });
        return { ok: true };
    }

    // ── Logout ─────────────────────────────────────────────────────────────────
    logout() {
        this._state.set({ user: null, isAuthenticated: false });
        localStorage.removeItem('erp_auth');
        this.router.navigate(['/landing-page']);
    }
}
