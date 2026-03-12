import { Component, computed, ElementRef, EventEmitter, Input, OnInit, Output, Signal, signal, ViewChild } from '@angular/core';
import { PostDto } from '../../models/post.dto';
import { Card } from '../card/card';
import { CommonModule } from '@angular/common';
import { ProfileIcon } from "../profile-icon/profile-icon";
import { MatIcon } from '@angular/material/icon';
import { Comment } from '../comment/comment';
import { formattedTime } from '../../utilities/time';
import { PostService } from '../../services/post.service';
import { CommentCreate } from '../comment-create/comment-create';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../../core/state/global';
import { CommentService } from '../../services/comment.service';
import { PostStore } from '../../stores/post.store';
import { LikeService } from '../../services/like.service';
import { RouterModule } from "@angular/router";
import { CommentDto } from '../../models/comment.dto';

@Component({
  selector: 'app-post',
  imports: [Card, CommonModule, ProfileIcon, MatIcon, Comment, CommentCreate, FormsModule, RouterModule],
  templateUrl: './post.html',
  styleUrl: './post.scss',
})
export class Post implements OnInit {
  @Input() postId!: string;
  @Output() postDeleted = new EventEmitter<PostDto>();

  @ViewChild(CommentCreate)
  commentCreateComponent!: CommentCreate

  constructor(
    private globalService: GlobalService,
    private postService: PostService,
    private postStore: PostStore,
    public commentService: CommentService,
    private likeService: LikeService,
  ) {}

  post!: Signal<PostDto | undefined>
  comments!: Signal<CommentDto[] | undefined>;
  commentPageCount = signal<number>(2)

  isCurrentUserPost: Signal<boolean> = computed(() => this.post()?.userId === this.globalService.user()?.userId);
  timeAgo = signal("");
  editMode = signal(false);
  seeMore = signal(false);
  copied = signal(false)
  shouldShowCommentSection = signal(false)

  mutableTextContent: string = ""
  mutableImageUrl: string | undefined = undefined

  ngOnInit(): void {
    this.post = this.postStore.getPost(this.postId)
    this.comments = this.postStore.getComments(this.postId)

    const post = this.post();

    this.timeAgo.set(post ? formattedTime(post.createdAt) : '')
    this.mutableImageUrl = post?.imageUrl
    this.mutableTextContent = post?.textContent ?? ""

    if (post && post.textContent && post.textContent.length > 125 && post.imageUrl) {
      this.seeMore.set(true)
    }
    if (post && post?.initialComments) this.postStore.addManyComments(this.postId, post.initialComments)
  }

  openSeeMore(): void {
    this.seeMore.set(false)
  }

  loadComments(): void {
    const post = this.post();
    if (!post) return

    const commentPage = this.commentPageCount()
    const skip = this.comments()?.length ?? 0

    this.commentService.getCommentsByPostId(post, commentPage, skip).subscribe({
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
        this.postDeleted.emit(this.post())
      },
      error: (error) => {
        window.alert("Error deleting post: " + error.message);
      }
    })
  }

  copyShareToClipboard(): void {
    if (!this.post() || !this.post()?.postId) return
    this.copied.set(true)

    setTimeout(() => this.copied.set(false), 2000)

    navigator.clipboard.writeText(`${window.location.origin}/share/p/${this.post()?.postId}`)
  }

  toggleCommentSection(): void {
    this.shouldShowCommentSection.set(!this.shouldShowCommentSection())
    if (this.shouldShowCommentSection()) setTimeout(() => this.commentCreateComponent.focusCommentCreate())
  }
}
