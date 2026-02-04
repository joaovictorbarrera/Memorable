import { Component, EventEmitter, Output, signal } from '@angular/core';
import { Card } from '../../../../shared/components/card/card';
import { MatIcon } from '@angular/material/icon';
import { ProfileIcon } from '../../../../shared/components/profile-icon/profile-icon';
import { PostButton } from "../post-button/post-button";
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../../shared/services/post.service';
import { CurrentUserService } from '../../../../shared/services/currentuser.service';

@Component({
  selector: 'app-post-create',
  imports: [Card, MatIcon, ProfileIcon, PostButton, FormsModule],
  templateUrl: './post-create.html',
  styleUrl: './post-create.scss',
})
export class PostCreate {
  postContent = signal<string>("");
  @Output() postCreated = new EventEmitter<void>();

  constructor (private postService: PostService, public currentUserService: CurrentUserService) {}

  post(): void {
    if (this.postContent().trim() === "") {
      return; // Do not post empty content
    }

    this.postService.createPost({textContent: this.postContent()}).subscribe({
      next: () => {
        this.postContent.set(""); // clear input field
        this.postCreated.emit(); // notify parent to refresh feed
      },
      error: (error) => {
        console.error("Error creating post:", error);
      }
    });
  }
}
