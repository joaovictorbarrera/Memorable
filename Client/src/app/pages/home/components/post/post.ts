import { Component, computed, EventEmitter, Input, OnInit, Output, Signal, signal } from '@angular/core';
import { PostDto } from '../../../../shared/models/post.dto';
import { Card } from '../../../../shared/components/card/card';
import { CommonModule } from '@angular/common';
import { ProfileIcon } from "../../../../shared/components/profile-icon/profile-icon";
import { MatIcon } from '@angular/material/icon';
import { Comment } from '../comment/comment';
import { PostButton } from "../post-button/post-button";
import { formattedTime } from '../../../../shared/utilities/time';
import { CurrentUserService } from '../../../../shared/services/currentuser.service';
import { PostService } from '../../../../shared/services/post.service';

@Component({
  selector: 'app-post',
  imports: [Card, CommonModule, ProfileIcon, MatIcon, Comment, PostButton],
  templateUrl: './post.html',
  styleUrl: './post.scss',
})
export class Post implements OnInit {
  @Input() post!: PostDto;
  @Output() refreshFeed = new EventEmitter<void>();

  isCurrentUserPost: Signal<boolean> = signal(false);
  timeAgo: string = '';

  constructor(private currentUserService: CurrentUserService, private postService: PostService) {
    this.isCurrentUserPost = computed(() => {

      return this.post.userId === currentUserService.user()?.userId;
    })
  }

  ngOnInit(): void {
    this.timeAgo = formattedTime(this.post.createdAt);
  }

  toggleLike(post: PostDto): void {
    post.isLikedByCurrentUser = !post.isLikedByCurrentUser
    post.likeCount += post.isLikedByCurrentUser ? 1 : -1;
  }

  editPost(): void {
    return; // TODO: implement edit post functionality
  }

  deletePost(): void {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    this.postService.deletePost(this.post.postId).subscribe({
      next: () => {
        this.refreshFeed.emit();
      },
      error: (error) => {
        window.alert("Error deleting post: " + error.message);
      }
    });

  }
}
