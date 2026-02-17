import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-follow-button',
  imports: [],
  templateUrl: './follow-button.html',
  styleUrl: './follow-button.scss',
})
export class FollowButton {
  @Input() following!: boolean;
  @Input() userId!: string;

  toggleFollow() {
    this.following = !this.following;
  }
}
