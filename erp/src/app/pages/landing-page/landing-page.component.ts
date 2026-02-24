import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [RouterLink, ButtonModule, CardModule, DividerModule],
    templateUrl: './landing-page.component.html'
})
export default class LandingPageComponent { }
