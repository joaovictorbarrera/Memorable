import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../shared/services/post.service';
import { PostDto } from '../../shared/models/post.dto';
import { Post } from "../../shared/components/post/post";
import { PostStore } from '../../shared/stores/post.store';

@Component({
  selector: 'app-post-share',
  imports: [Post],
  templateUrl: './post-share.html',
  styleUrl: './post-share.scss',
})
export class PostShare implements OnInit {
  postId = signal<string | null>(null)
  loading = signal(true)


  constructor(private route: ActivatedRoute, private postService: PostService, private postStore: PostStore) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      const postId = params.get('postId');
      if (!postId) return;

      this.postService.getById(postId).subscribe({
        next: (post: PostDto): void => {
          this.postId.set(postId)
          this.postStore.addPost(post)
        },
        complete: () => {
          this.loading.set(false)
        }
      }
      )
    })
  }
}
