import { Component, Input, signal } from '@angular/core';
import { ProfileIcon } from '../../../../shared/components/profile-icon/profile-icon';
import { PostButton } from '../post-button/post-button';
import { PostDto } from '../../../../shared/models/post.dto';
import { CommentDto } from '../../../../shared/models/comment.dto';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../../../shared/services/comment.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-comment-create',
  imports: [PostButton, ProfileIcon, FormsModule],
  templateUrl: './comment-create.html',
  styleUrl: './comment-create.scss',
})
export class CommentCreate {
  @Input() post!: PostDto;
  commentContent = signal<string>("");
  loading = signal<boolean>(false);

  constructor(private commentService: CommentService) {}

  createComment() {
    this.loading.set(true)

    this.commentService.createComment(this.commentContent(), this.post.postId)
    .pipe(
          finalize(() =>
            this.loading.set(false)
          )
        )
    .subscribe({
      next: (comment: CommentDto) => {
        this.commentContent.set("")
        this.post.comments.push(comment)
      },
      error: (err) => {
        console.log("Error creating comment: ", err)
      }
    })
  }
}
