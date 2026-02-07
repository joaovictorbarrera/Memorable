import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ProfileIcon } from '../../../shared/components/profile-icon/profile-icon';
import { GlobalService } from '../../state/global';

@Component({
  selector: 'app-header',
  imports: [RouterModule, MatIconModule, ProfileIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(public globalService: GlobalService) {
  }
}
