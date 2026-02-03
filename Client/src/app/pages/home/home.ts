import { Component, OnInit, signal } from '@angular/core';
import { PostCreate } from './components/post-create/post-create';
import { PostDto } from '../../shared/models/post.dto';
import { PostService } from '../../shared/services/post.service';
import { Post } from './components/post/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostCreate, Post, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
   feed = signal<PostDto[]>([]);

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.refreshFeed();
  }

  refreshFeed(): void {
    this.postService.getFeed(10, 1).subscribe((posts: PostDto[]) => {
      this.feed.set(posts);
    });
  }
}
