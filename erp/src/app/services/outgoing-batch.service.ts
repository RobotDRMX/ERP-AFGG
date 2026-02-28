import { Injectable, signal, computed } from '@angular/core';

export type BatchStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface OutgoingBatch {
    id: string;
    description: string;
    amount: number;
    currency: string;
    status: BatchStatus;
    companyId: number;
    createdAt: Date;
    processedAt?: Date;
    errorMessage?: string;
}

@Injectable({ providedIn: 'root' })
export class OutgoingBatchService {
    private readonly _batches = signal<OutgoingBatch[]>([
        { id: 'OB-001', description: 'Pago nómina enero', amount: 125_000, currency: 'MXN', status: 'completed', companyId: 1, createdAt: new Date('2025-01-31'), processedAt: new Date('2025-02-01') },
        { id: 'OB-002', description: 'Pago proveedores', amount: 48_300, currency: 'MXN', status: 'processing', companyId: 1, createdAt: new Date('2025-02-10') },
        { id: 'OB-003', description: 'Transferencia USD', amount: 9_800, currency: 'USD', status: 'pending', companyId: 2, createdAt: new Date('2025-02-18') },
        { id: 'OB-004', description: 'Pago impuestos', amount: 32_000, currency: 'MXN', status: 'failed', companyId: 2, createdAt: new Date('2025-02-15'), errorMessage: 'Cuenta destino inválida' },
    ]);

    readonly batches = this._batches.asReadonly();
    readonly totalCount = computed(() => this._batches().length);
    readonly pendingCount = computed(() => this._batches().filter(b => b.status === 'pending').length);
    readonly completedCount = computed(() => this._batches().filter(b => b.status === 'completed').length);
    readonly failedCount = computed(() => this._batches().filter(b => b.status === 'failed').length);

    add(batch: Omit<OutgoingBatch, 'id' | 'createdAt'>): void {
        const newId = `OB-${String(this._batches().length + 1).padStart(3, '0')}`;
        this._batches.update(list => [...list, { ...batch, id: newId, createdAt: new Date() }]);
    }

    updateStatus(id: string, status: BatchStatus, errorMessage?: string): void {
        this._batches.update(list =>
            list.map(b => b.id === id
                ? { ...b, status, processedAt: status === 'completed' ? new Date() : b.processedAt, errorMessage }
                : b
            )
        );
    }

    getByCompany(companyId: number): OutgoingBatch[] {
        return this._batches().filter(b => b.companyId === companyId);
    }
}
