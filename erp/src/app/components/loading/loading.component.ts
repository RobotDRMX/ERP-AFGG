import { Component, input } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-loading',
    imports: [ProgressSpinnerModule],
    template: `
    @if (visible()) {
      <div class="loading-overlay">
        <div class="loading-content">
          <p-progressSpinner 
            styleClass="custom-spinner" 
            strokeWidth="4" 
            fill="transparent" 
            animationDuration=".8s" />
          @if (message()) {
            <p class="loading-message">{{ message() }}</p>
          }
        </div>
      </div>
    }
  `,
    styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    .loading-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    .loading-message {
      color: var(--color-text);
      font-weight: 500;
      font-size: 1.1rem;
    }
    :host ::ng-deep .custom-spinner .p-progress-spinner-circle {
      stroke: var(--color-primary);
    }
  `]
})
export class LoadingComponent {
    visible = input<boolean>(false);
    message = input<string>('');
}
