import { Component, Input, OnInit } from '@angular/core';
import { CommentDto } from '../../../../shared/models/comment.dto';
import { ProfileIcon } from "../../../../shared/components/profile-icon/profile-icon";
import { formattedTime } from '../../../../shared/utilities/time';
import { GlobalService } from '../../../../core/state/global';
import { MatIcon } from '@angular/material/icon';
import { CommentService } from '../../../../shared/services/comment.service';
import { PostStore } from '../../../../shared/stores/post.store';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-comment',
  imports: [ProfileIcon, MatIcon, RouterModule],
  templateUrl: './comment.html',
  styleUrl: './comment.scss',
})
export class Comment implements OnInit {
  @Input() comment!: CommentDto;
  timeAgo: string = '';

  constructor(
    public globalService: GlobalService,
    private commentService: CommentService,
    private postStore: PostStore,
  ) { }

  ngOnInit(): void {
    this.timeAgo = formattedTime(this.comment.createdAt);
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
