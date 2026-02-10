import { Component, Input, OnInit, Signal, signal } from '@angular/core';
import { ProfileIcon } from '../../../../shared/components/profile-icon/profile-icon';
import { PostButton } from '../post-button/post-button';
import { PostDto } from '../../../../shared/models/post.dto';
import { CommentDto } from '../../../../shared/models/comment.dto';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../../../shared/services/comment.service';
import { finalize } from 'rxjs';
import { PostStore } from '../../../../shared/stores/post.store';
import { GlobalService } from '../../../../core/state/global';

@Component({
  selector: 'app-comment-create',
  imports: [PostButton, ProfileIcon, FormsModule],
  templateUrl: './comment-create.html',
  styleUrl: './comment-create.scss',
})
export class CommentCreate implements OnInit {
  @Input() postId!: string;
  commentContent = signal<string>("");
  loading = signal<boolean>(false);
  post!: Signal<PostDto | undefined>

  constructor(
    private commentService: CommentService,
    private postStore: PostStore,
    public globalService: GlobalService
  ) {}

   ngOnInit(): void {
    this.post = this.postStore.getPost(this.postId)
   }

  createComment() {
    this.loading.set(true)

    this.commentService.createComment(this.commentContent(), this.postId)
    .pipe(
          finalize(() =>
            this.loading.set(false)
          )
        )
    .subscribe({
      next: (comment: CommentDto) => {
        this.commentContent.set("")
        this.postStore.addComment(this.postId, comment)
      },
      error: (err) => {
        window.alert("Error creating comment: " + err.message)
      }
    })
  }
}
