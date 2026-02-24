import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { OutgoingBatchService } from '../../services/outgoing-batch.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule, TagModule],
    templateUrl: './dashboard.component.html'
})
export default class DashboardComponent {
    batchService = inject(OutgoingBatchService);
}
