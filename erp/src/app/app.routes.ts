import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

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
                loadComponent: () => import('./pages/landing-page/landing-page.component')
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/dashboard/dashboard.component')
            },
            {
                path: 'prices',
                loadComponent: () => import('./pages/prices/prices.component')
            }
        ]
    },
    {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/auth/login/login.component')
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/auth/register/register.component')
            }
        ]
    },
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'admin-user',
                loadComponent: () => import('./pages/admin-user/admin-user.component')
            },
            {
                path: 'logs',
                loadComponent: () => import('./pages/logs/logs.component')
            },
            {
                path: 'financial-summary',
                loadComponent: () => import('./pages/financial-summary/financial-summary.component')
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'landing-page'
    }
];
