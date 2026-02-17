import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FollowService } from '../../../../shared/services/follow.service';

@Component({
  selector: 'app-follow-button',
  imports: [],
  templateUrl: './follow-button.html',
  styleUrl: './follow-button.scss',
})
export class FollowButton {
  @Input() isFollowedByCurrentUser!: boolean;
  @Input() userId!: string;
  @Output() followChange = new EventEmitter<boolean>();

  constructor(
    private followService: FollowService
  ) {}

  toggleFollow() {
    if (this.isFollowedByCurrentUser) {
      this.unfollow();
    } else {
      this.follow();
    }

    this.isFollowedByCurrentUser = !this.isFollowedByCurrentUser;
  }

  follow(): void {
    if (!this.userId) return;
    this.followService.follow(this.userId).subscribe({
      next: () => {
        this.followChange.emit(true);
      },
      error: (err) => {
        window.alert("Error following user: "+ err.message)
      }
    })

  }

  unfollow(): void {
    if (!this.userId) return;
    this.followService.unfollow(this.userId).subscribe({
      next: () => {
        this.followChange.emit(false);
      },
      error: (err) => {
        window.alert("Error following user: "+ err.message)
      }
    })
  }
}
