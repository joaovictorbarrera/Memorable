import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ProfileIcon } from '../../../shared/components/profile-icon/profile-icon';
import { GlobalService } from '../../state/global';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, MatIconModule, ProfileIcon, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(public globalService: GlobalService, private router: Router) {
  }

  isActive(route: string): boolean {
    console.log(this.router.url, route)
    return this.router.url === route;
  }
}
