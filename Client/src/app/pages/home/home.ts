import { Component, OnInit, signal } from '@angular/core';
import { PostCreate } from './components/post-create/post-create';
import { PostDto } from '../../shared/models/post.dto';
import { PostService } from '../../shared/services/post.service';
import { Post } from './components/post/post';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../shared/services/comment.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostCreate, Post, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
   feed = signal<PostDto[]>([]);

  constructor(private postService: PostService, private commentService: CommentService) {}

  ngOnInit(): void {
    this.refreshFeed();
  }

  refreshFeed(): void {
    // TODO: Lazy Load
    this.postService.getFeed(10, 1).subscribe({
      next: (posts: PostDto[]) => {
        this.commentService.clear()
        this.feed.set(posts);

        // Feed comments into store
        posts.forEach(p =>
          p.comments.forEach(
            c => this.commentService.add(p.postId, c)
          )
        )
      },
      error: (err) => {
        console.log("Error fetching feed: ", err)
      },
    });
  }
}
