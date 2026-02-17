import { Component, computed, EventEmitter, Input, OnInit, Output, Signal, signal } from '@angular/core';
import { PostDto } from '../../../../shared/models/post.dto';
import { Card } from '../../../../shared/components/card/card';
import { CommonModule } from '@angular/common';
import { ProfileIcon } from "../../../../shared/components/profile-icon/profile-icon";
import { MatIcon } from '@angular/material/icon';
import { Comment } from '../comment/comment';
import { formattedTime } from '../../../../shared/utilities/time';
import { PostService } from '../../../../shared/services/post.service';
import { CommentCreate } from '../comment-create/comment-create';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../../../core/state/global';
import { CommentService } from '../../../../shared/services/comment.service';
import { PostStore } from '../../../../shared/stores/post.store';
import { LikeService } from '../../../../shared/services/like.service';
import { RouterModule } from "@angular/router";
import { CommentDto } from '../../../../shared/models/comment.dto';

@Component({
  selector: 'app-post',
  imports: [Card, CommonModule, ProfileIcon, MatIcon, Comment, CommentCreate, FormsModule, RouterModule],
  templateUrl: './post.html',
  styleUrl: './post.scss',
})
export class Post implements OnInit {
  @Input() postId!: string;

  constructor(
    private globalService: GlobalService,
    private postService: PostService,
    private postStore: PostStore,
    public commentService: CommentService,
    private likeService: LikeService,
  ) {}

  post!: Signal<PostDto | undefined>
  comments!: Signal<CommentDto[] | undefined>;
  commentPageCount = signal<number>(1)

  isCurrentUserPost: Signal<boolean> = computed(() => this.post()?.userId === this.globalService.user()?.userId);
  timeAgo: string = '';
  editMode = signal(false);

  mutableTextContent: string = ""
  mutableImageUrl: string | undefined = undefined

  ngOnInit(): void {
    this.post = this.postStore.getPost(this.postId)
    this.comments = this.postStore.getComments(this.postId)

    const post = this.post();

    this.timeAgo = post ? formattedTime(post.createdAt) : '';
    this.mutableImageUrl = post?.imageUrl
    this.mutableTextContent = post?.textContent ?? ""

    if (post && post?.initialComments) this.postStore.addManyComments(this.postId, post.initialComments)
  }

  loadComments(): void {
    const post = this.post();
    if (!post) return

    this.commentService.getCommentsByPostId(post, this.commentPageCount(), post.initialComments?.length ?? 0).subscribe({
      next: (comments) => {
        this.postStore.addManyComments(post.postId, comments)
        this.commentPageCount.set(this.commentPageCount() + 1)
      }
    })
  }

  toggleLike(): void {
    let apiCall;
    if (this.postStore.isLikedByUser(this.postId))
      apiCall = this.likeService.deleteLike(this.postId)
    else
      apiCall = this.likeService.createLike(this.postId)

    apiCall.subscribe({
      next() {
        console.log("Liked!")
      },
      error(err) {
        console.log("Error liking post: " + err.message)
      }
    })

    this.postStore.togglePostLike(this.postId)
  }

  editPost(): void {
    const post = this.post()
    if (!post) return

    this.editMode.set(true);
  }

  cancelEdit(): void {
    this.mutableImageUrl = this.post()?.imageUrl
    this.editMode.set(false);
  }

  saveEdits(): void {
    const post = this.post()
    if (!post) return

    const newPost = {
      ...post,
      imageUrl: this.mutableImageUrl,
      textContent: this.mutableTextContent
    }

    if (!newPost.imageUrl && !newPost.textContent) return window.alert("Post cannot be empty")

    this.postService.updatePost(newPost).subscribe({
      next: (updatedPost: PostDto) => {
        this.postStore.setPost(updatedPost)
        this.editMode.set(false);
      },
      error: (error) => {
        window.alert("Error updating post: " + error.message);
      }
    });
  }

  removeImage(): void {
    this.mutableImageUrl = undefined
  }

  deletePost(): void {
    const post = this.post()
    if (!post) return

    if (!window.confirm("Are you sure you want to delete this post?")) return;

    this.postService.deletePost(post.postId).subscribe({
      next: () => {
        this.postStore.removePost(this.postId)
      },
      error: (error) => {
        window.alert("Error deleting post: " + error.message);
      }
    })
  }
}
