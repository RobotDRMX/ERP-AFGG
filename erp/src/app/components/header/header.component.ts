import { Component, output, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonModule, AvatarModule, BadgeModule, OverlayBadgeModule, TooltipModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  auth = inject(AuthService);
  notificationClick = output<void>();
}
