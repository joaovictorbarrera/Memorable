import { Component, Input, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { fallbackProfileImageUrl } from '../../../core/state/constants';
@Component({
  selector: 'app-profile-icon',
  imports: [RouterModule],
  templateUrl: './profile-icon.html',
  styleUrl: './profile-icon.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProfileIcon {
  @Input() imageUrl!: string | undefined;
  @Input() username!: string | undefined;

  readonly fallbackImage = fallbackProfileImageUrl
}
