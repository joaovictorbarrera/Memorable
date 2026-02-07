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
import { CommentCreate } from '../comment-create/comment-create';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../../../core/state/global';

@Component({
  selector: 'app-post',
  imports: [Card, CommonModule, ProfileIcon, MatIcon, Comment, CommentCreate, FormsModule],
  templateUrl: './post.html',
  styleUrl: './post.scss',
})
export class Post implements OnInit {
  @Input() post!: PostDto;
  @Output() refreshFeed = new EventEmitter<void>();

  isCurrentUserPost: Signal<boolean> = signal(false);
  timeAgo: string = '';
  editMode = signal(false);
  newPost: PostDto = {} as PostDto;

  constructor(private globalService: GlobalService, private postService: PostService) {
    this.isCurrentUserPost = computed(() => {

      return this.post.userId === this.globalService.user()?.userId;
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
    this.newPost = { ...this.post }; // Create a copy of the post to edit
    this.editMode.set(true);
  }

  cancelEdit(): void {
    // Revert changes by copying back the original post
    this.post = { ...this.newPost };
    this.editMode.set(false);
  }

  saveEdits(): void {
    this.postService.updatePost(this.post).subscribe({
      next: (updatedPost) => {
        this.post = updatedPost;
        this.editMode.set(false);
      },
      error: (error) => {
        window.alert("Error updating post: " + error.message);
      }
    });
  }

  removeImage(): void {
    this.post.imageUrl = undefined;
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
