import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PostCreate } from './components/post-create/post-create';
import { PostDto } from '../../shared/models/post.dto';
import { PostService } from '../../shared/services/post.service';
import { Post } from './components/post/post';
import { CommonModule } from '@angular/common';
import { PostStore } from '../../shared/stores/post.store';
import { postPageSize } from '../../core/state/constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostCreate, Post, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, AfterViewInit {
  @ViewChild('scrollAnchor') scrollAnchor!: ElementRef;

  private page = 1;
  public loading = false;
  private hasMore = true;
  private observer!: IntersectionObserver;

  constructor(
    private postService: PostService,
    public postStore: PostStore
  ) {}

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.loadNextPage();
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0,
      }
    );

    this.observer.observe(this.scrollAnchor.nativeElement);
  }

  ngOnInit(): void {
    this.postStore.clearAll()
    this.loadNextPage();
  }

  loadNextPage(): void {
    if (this.loading || !this.hasMore) return;

    this.loading = true;

    this.postService.getFeed(this.page).subscribe({
      next: (posts: PostDto[]) => {
        if (posts.length < postPageSize) {
          this.hasMore = false;
        }

        this.postStore.addManyPosts(posts);
        this.page++;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        window.alert('Error fetching feed: ' + err.message);
      },
    });
  }
}
