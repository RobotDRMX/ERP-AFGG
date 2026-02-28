import { Injectable, signal } from '@angular/core';

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'manager' | 'viewer';
    companyId: number;
    active: boolean;
    avatar?: string;
    createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
    private readonly _users = signal<User[]>([
        { id: 1, name: 'Luis García', email: 'luis@erp.com', role: 'admin', companyId: 1, active: true, createdAt: new Date('2024-01-01') },
        { id: 2, name: 'Ana Martínez', email: 'ana@erp.com', role: 'manager', companyId: 1, active: true, createdAt: new Date('2024-02-10') },
        { id: 3, name: 'Pedro López', email: 'pedro@erp.com', role: 'viewer', companyId: 2, active: true, createdAt: new Date('2024-03-05') },
        { id: 4, name: 'Sofía Ramírez', email: 'sofia@erp.com', role: 'manager', companyId: 2, active: false, createdAt: new Date('2023-12-01') },
    ]);

    readonly users = this._users.asReadonly();

    getById(id: number): User | undefined {
        return this._users().find(u => u.id === id);
    }

    getByCompany(companyId: number): User[] {
        return this._users().filter(u => u.companyId === companyId);
    }

    add(user: Omit<User, 'id' | 'createdAt'>): void {
        const next = this._users();
        const newId = next.length ? Math.max(...next.map(u => u.id)) + 1 : 1;
        this._users.set([...next, { ...user, id: newId, createdAt: new Date() }]);
    }

    update(id: number, partial: Partial<User>): void {
        this._users.update(list => list.map(u => u.id === id ? { ...u, ...partial } : u));
    }

    remove(id: number): void {
        this._users.update(list => list.filter(u => u.id !== id));
    }

    toggleActive(id: number): void {
        this._users.update(list => list.map(u => u.id === id ? { ...u, active: !u.active } : u));
    }
}
