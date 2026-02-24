import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
    private readonly _loading = signal(false);
    private readonly _message = signal('');

    readonly loading = this._loading.asReadonly();
    readonly message = this._message.asReadonly();

    show(message: string = 'Cargando...') {
        this._message.set(message);
        this._loading.set(true);
    }

    hide() {
        this._loading.set(false);
        this._message.set('');
    }
}
