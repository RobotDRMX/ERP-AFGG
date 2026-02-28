import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';

interface Group {
    id: number;
    name: string;
    total: number;
    advances: number;
    status: 'active' | 'inactive' | 'completed';
}

@Component({
    selector: 'app-group',
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule, TagModule, ProgressBarModule],
    templateUrl: './group.component.html'
})
export default class GroupComponent {
    groups: Group[] = [
        { id: 1, name: 'Grupo A',  total: 30, advances: 18, status: 'active' },
        { id: 2, name: 'Grupo B',  total: 25, advances: 25, status: 'completed' },
        { id: 3, name: 'Grupo C',  total: 28, advances: 5,  status: 'inactive' },
        { id: 4, name: 'Grupo D',  total: 32, advances: 12, status: 'active' },
    ];

    get totalStudents(): number {
        return this.groups.reduce((acc, g) => acc + g.total, 0);
    }

    get totalAdvances(): number {
        return this.groups.reduce((acc, g) => acc + g.advances, 0);
    }

    getProgress(group: Group): number {
        return Math.round((group.advances / group.total) * 100);
    }

    getStatusSeverity(status: string): 'success' | 'warn' | 'danger' {
        switch (status) {
            case 'active':    return 'success';
            case 'completed': return 'warn';
            default:          return 'danger';
        }
    }

    getStatusLabel(status: string): string {
        switch (status) {
            case 'active':    return 'ACTIVO';
            case 'completed': return 'COMPLETADO';
            default:          return 'INACTIVO';
        }
    }
}
