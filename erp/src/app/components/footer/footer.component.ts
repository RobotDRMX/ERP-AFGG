import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, DividerModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
}
