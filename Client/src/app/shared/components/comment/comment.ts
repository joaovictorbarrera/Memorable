import { Component, Input, OnInit, signal } from '@angular/core';
import { CommentDto } from '../../models/comment.dto';
import { ProfileIcon } from "../profile-icon/profile-icon";
import { formattedTime } from '../../utilities/time';
import { GlobalService } from '../../../core/state/global';
import { MatIcon } from '@angular/material/icon';
import { CommentService } from '../../services/comment.service';
import { PostStore } from '../../stores/post.store';
import { RouterModule } from '@angular/router';
import { SlicePipe } from '@angular/common';
@Component({
  selector: 'app-comment',
  imports: [ProfileIcon, MatIcon, RouterModule, SlicePipe],
  templateUrl: './comment.html',
  styleUrl: './comment.scss',
})
export class Comment implements OnInit {
  @Input() comment!: CommentDto;
  timeAgo = signal('');
  seeMore = signal(false)

  constructor(
    public globalService: GlobalService,
    private commentService: CommentService,
    private postStore: PostStore,
  ) { }

  ngOnInit(): void {
    this.timeAgo.set(formattedTime(this.comment.createdAt));
    if (this.comment.textContent && this.comment.textContent.length > 100) {
      this.seeMore.set(true)
    }
  }

  openSeeMore(): void {
    this.seeMore.set(false)
  }

  deleteComment(): void {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      this.commentService.deletePost(this.comment.commentId)
      .subscribe({
          next: () => {
            this.postStore.removeComment(this.comment.postId, this.comment.commentId)
          },
          error: (err) => {
            window.alert("Error deleting comment: "+ err.message)
          }
      })
    }
  }
}
