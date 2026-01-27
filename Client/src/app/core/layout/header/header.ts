import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ProfileIcon } from '../../../shared/components/profile-icon/profile-icon';

@Component({
  selector: 'app-header',
  imports: [RouterModule, MatIconModule, ProfileIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
