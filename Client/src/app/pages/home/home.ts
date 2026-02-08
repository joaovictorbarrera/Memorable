import { Component, OnInit } from '@angular/core';
import { PostCreate } from './components/post-create/post-create';
import { PostDto } from '../../shared/models/post.dto';
import { PostService } from '../../shared/services/post.service';
import { Post } from './components/post/post';
import { CommonModule } from '@angular/common';
import { PostStore } from '../../shared/stores/post.store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostCreate, Post, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  constructor(
    private postService: PostService,
    public postStore: PostStore
  ) {}

  ngOnInit(): void {
    this.refreshFeed();
  }

  refreshFeed(): void {
    // TODO: Lazy Load
    this.postService.getFeed(10, 1).subscribe({
      next: (posts: PostDto[]) => {
        this.postStore.setAll(posts)
      },
      error: (err) => {
        window.alert("Error fetching feed: "+ err.message)
      },
    });
  }
}
