import { Component, Input } from '@angular/core';
import { PostDto } from '../../../../shared/models/post.dto';
import { Card } from '../../../../shared/components/card/card';
import { CommonModule } from '@angular/common';
import { ProfileIcon } from "../../../../shared/components/profile-icon/profile-icon";
import { MatIcon } from '@angular/material/icon';
import { Comment } from '../comment/comment';
import { PostButton } from "../post-button/post-button";
import { formattedTime } from '../../../../shared/utilities/time';

@Component({
  selector: 'app-post',
  imports: [Card, CommonModule, ProfileIcon, MatIcon, Comment, PostButton],
  templateUrl: './post.html',
  styleUrl: './post.scss',
})
export class Post {
  @Input() post!: PostDto;

  formatTime(date: Date): string {
    return formattedTime(date);
  }

  toggleLike(post: PostDto): void {
    post.isLikedByCurrentUser = !post.isLikedByCurrentUser
    post.likeCount += post.isLikedByCurrentUser ? 1 : -1;
  }
}
