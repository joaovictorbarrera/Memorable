import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { FollowService } from '../../../../shared/services/follow.service';
import { ProfileIcon } from "../../../../shared/components/profile-icon/profile-icon";
import { Router, RouterLink } from '@angular/router';
import { FollowButton } from "../follow-button/follow-button";
import { GlobalService } from '../../../../core/state/global';

@Component({
  selector: 'app-follow-modal',
  imports: [MatIcon, ProfileIcon, RouterLink, FollowButton],
  templateUrl: './follow-modal.html',
  styleUrl: './follow-modal.scss',
})
export class FollowModal implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() type: 'followers' | 'following' = 'following';
  @Input() userId!: string;

  public loading = signal(true);
  public users = signal<UserDto[]>([]);

  constructor(private followService: FollowService, private globalService: GlobalService) {}

  isCurrentUser(userId: string): boolean {
    return this.globalService.user()?.userId === userId;
  }

  ngOnInit(): void {
    if (this.type === 'followers') {
      this.followService.getFollowers(this.userId).subscribe({
        next: (users) => {
          this.users.set(users);
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Error fetching followers:', error);
          this.loading.set(false);
        }
      });
    } else {
      this.followService.getFollowing(this.userId).subscribe({
        next: (users) => {
          this.users.set(users);
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Error fetching following:', error);
          this.loading.set(false);
        }
      });
    }
  }

  closeModal() {
    this.close.emit();
  }
}
