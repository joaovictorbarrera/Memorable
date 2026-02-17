import { AfterViewInit, Component, computed, ElementRef, OnInit, signal, Signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../shared/services/post.service';
import { UserService } from '../../shared/services/user.service';
import { Post } from "../home/components/post/post";
import { PostCreate } from "../home/components/post-create/post-create";
import { PostStore } from '../../shared/stores/post.store';
import { CommonModule } from '@angular/common';
import { GlobalService } from '../../core/state/global';
import { FollowButton } from "./components/follow-button/follow-button";
import { postPageSize } from '../../core/state/constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrl: './user.scss',
  imports: [Post, CommonModule, FollowButton, PostCreate],
})
export class User implements OnInit, AfterViewInit {
  @ViewChild('scrollAnchor') scrollAnchor!: ElementRef;
  username = signal<string | undefined>(undefined);
  user = signal<UserDto | undefined>(undefined);

  private page = 1;
  public loadingPosts = signal(false);
  public loadingUser = signal(false);
  private hasMore = true;
  private observer!: IntersectionObserver;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService,
    public postStore: PostStore,
    private globalService: GlobalService
  ) {}

   ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const username = params.get('username');
      if (!username) return;
      this.username.set(username);

      this.hasMore = true;
      this.page = 1;

      this.loadingUser.set(true);
      this.loadUserAndPosts(username);
    });
  }

  loadUserAndPosts(username: string): void {
    this.userService.getUserByUsername(username).subscribe({
      next: (user) => {
        this.user.set(user);
        this.loadingUser.set(false);
        this.postStore.clearAll()
        this.loadUserPosts(user.userId);
      },
      error: (err) => {
        console.error('Error fetching user:', err);
        this.loadingUser.set(false);
      }
    });
  }


  ngAfterViewInit(): void {
    this.setupObserver();
  }

  setupObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.loadUserPosts(this.user()?.userId ?? '');
        }
      },
      {
        root: null,
        rootMargin: '1000px',
        threshold: 0,
      }
    );

    this.observer.observe(this.scrollAnchor.nativeElement);
  }

  isCurrentUserProfile(): boolean {
    return this.globalService.user()?.userId === this.user()?.userId
  }

  loadUserPosts(userId: string): void {
    if (!userId) return;
    if (this.loadingPosts() || !this.hasMore) return;

    this.loadingPosts.set(true);

    this.postService.getForProfile(userId, this.page).subscribe({
      next: (posts) => {
        if (posts.length < postPageSize) {
          this.hasMore = false;
        }

        this.loadingPosts.set(false);
        this.postStore.addManyPosts(posts)
        this.page++;
      },
      error: (error) => {
        this.loadingPosts.set(false);
        console.error('Error fetching posts:', error);
      }
    });
  }

  updateFollowerCount(followStatus: boolean): void {
    const user = this.user();
    if (!user) return;
    user.followerCount = followStatus ? user.followerCount + 1 : user.followerCount - 1;
    this.user.set(user);
  }

  increasePostCount(): void {
    const user = this.user();
    if (!user) return;
    user.postCount += 1;
    this.user.set(user);
  }

  decreasePostCount(): void {
    const user = this.user();
    if (!user) return;
    user.postCount -= 1;
    this.user.set(user);
  }
}
