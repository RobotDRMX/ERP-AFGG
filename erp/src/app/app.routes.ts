import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'landing-page',
                pathMatch: 'full'
            },
            {
                path: 'landing-page',
                loadComponent: () => import('./pages/landing-page.component')
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/dashboard.component')
            },
            {
                path: 'prices',
                loadComponent: () => import('./pages/prices.component')
            }
        ]
    },
    {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/auth/login.component')
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/auth/register.component')
            }
        ]
    },
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'admin-user',
                loadComponent: () => import('./pages/admin-user.component')
            },
            {
                path: 'logs',
                loadComponent: () => import('./pages/logs.component')
            },
            {
                path: 'financial-summary',
                loadComponent: () => import('./pages/financial-summary.component')
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'landing-page'
    }
];
