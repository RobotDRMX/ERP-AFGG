import { Component, input } from '@angular/core';

@Component({
    selector: 'app-body',
    template: `
    <main [class]="'app-main-content ' + class()">
      <div class="container">
        <ng-content></ng-content>
      </div>
    </main>
  `,
    styles: [`
    .app-main-content {
      flex: 1;
      padding: 2rem 1.5rem;
      min-height: calc(100vh - var(--header-height) - var(--footer-height));
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .full-width .container {
      max-width: none;
    }
  `]
})
export class BodyComponent {
    class = input<string>('');
}
