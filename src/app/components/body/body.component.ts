import { Component, input } from '@angular/core';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [],
  templateUrl: './body.component.html'
})
export class BodyComponent {
  class = input<string>('');
}
