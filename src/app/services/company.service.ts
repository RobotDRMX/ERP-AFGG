import { Injectable, signal } from '@angular/core';

export interface Company {
    id: number;
    name: string;
    rfc: string;
    email: string;
    phone: string;
    address: string;
    active: boolean;
    createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class CompanyService {
    /** Reactive list of companies */
    private readonly _companies = signal<Company[]>([
        { id: 1, name: 'Acme Corp', rfc: 'ACM010101AAA', email: 'contact@acme.com', phone: '555-0001', address: 'Av. Reforma 100', active: true, createdAt: new Date('2024-01-10') },
        { id: 2, name: 'Tech Solutions', rfc: 'TEC020202BBB', email: 'info@techsol.mx', phone: '555-0002', address: 'Blvd. Industriales 200', active: true, createdAt: new Date('2024-03-15') },
        { id: 3, name: 'Global Trade', rfc: 'GLO030303CCC', email: 'admin@globaltrade.com', phone: '555-0003', address: 'Calle 5 de Mayo 50', active: false, createdAt: new Date('2023-11-20') },
    ]);

    readonly companies = this._companies.asReadonly();

    getById(id: number): Company | undefined {
        return this._companies().find(c => c.id === id);
    }

    add(company: Omit<Company, 'id' | 'createdAt'>): void {
        const next = this._companies();
        const newId = next.length ? Math.max(...next.map(c => c.id)) + 1 : 1;
        this._companies.set([...next, { ...company, id: newId, createdAt: new Date() }]);
    }

    update(id: number, partial: Partial<Company>): void {
        this._companies.update(list => list.map(c => c.id === id ? { ...c, ...partial } : c));
    }

    remove(id: number): void {
        this._companies.update(list => list.filter(c => c.id !== id));
    }
}
