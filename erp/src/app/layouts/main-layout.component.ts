import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { BodyComponent } from '../components/body/body.component';

@Component({
    selector: 'app-main-layout',
    imports: [RouterOutlet, HeaderComponent, FooterComponent, BodyComponent],
    template: `
    <div class="layout-wrapper">
      <app-header />
      <app-body>
        <router-outlet />
      </app-body>
      <app-footer />
    </div>
  `,
    styles: [`
    .layout-wrapper {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
  `]
})
export class MainLayoutComponent { }
