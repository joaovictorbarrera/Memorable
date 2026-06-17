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
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-comment',
  imports: [ProfileIcon, MatIcon, RouterModule, SlicePipe, FormsModule],
  templateUrl: './comment.html',
  styleUrl: './comment.scss',
})
export class Comment implements OnInit {
  @Input() comment!: CommentDto;
  timeAgo = signal('');
  seeMore = signal(false)

  editMode = signal(false)
  mutableTextContent = signal("")

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
    this.mutableTextContent.set(this.comment.textContent)
  }

  openSeeMore(): void {
    this.seeMore.set(false)
  }

  editComment() {
    this.editMode.set(true)
  }

  cancelEdit() {
    this.editMode.set(false);
    this.mutableTextContent.set(this.comment.textContent)
  }

  saveEdits() {
    if (this.mutableTextContent().trim() == "") {
      window.alert("Comment cannot be empty")
      return
    }

    let updatedComment = {...this.comment}

    updatedComment.textContent = this.mutableTextContent().trim()

    this.commentService.updateComment(updatedComment)
    .subscribe({
      next: (updatedCommentDto) => {
        this.postStore.setComment(updatedCommentDto)
        this.editMode.set(false)
      },
      error: (err) => {
          window.alert("Error updating comment: "+ err.message)
        }
    })

    return
  }

  deleteComment(): void {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      this.commentService.deleteComment(this.comment.commentId)
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
