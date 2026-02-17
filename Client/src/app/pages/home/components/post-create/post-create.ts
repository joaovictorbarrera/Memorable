import { Component, computed, ElementRef, EventEmitter, Output, signal, ViewChild } from '@angular/core';
import { Card } from '../../../../shared/components/card/card';
import { MatIcon } from '@angular/material/icon';
import { ProfileIcon } from '../../../../shared/components/profile-icon/profile-icon';
import { PostButton } from "../post-button/post-button";
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../../shared/services/post.service';
import { GlobalService } from '../../../../core/state/global';
import { finalize } from 'rxjs';
import { PostDto } from '../../../../shared/models/post.dto';
import { PostStore } from '../../../../shared/stores/post.store';

@Component({
  selector: 'app-post-create',
  imports: [Card, MatIcon, ProfileIcon, PostButton, FormsModule],
  templateUrl: './post-create.html',
  styleUrl: './post-create.scss',
})
export class PostCreate {
  textContent = signal<string>("");
  selectedImage = signal<File | null>(null);
  imagePreviewUrl = signal<string | null>(null);
  loading = signal<boolean>(false);
  shouldDisablePosting = computed(() =>
    (!this.textContent().trim() && !this.selectedImage()) || this.loading()
  )

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor (
    private postService: PostService,
    public globalService: GlobalService,
    public postStore: PostStore
  ) {}

  post(): void {
    if (this.shouldDisablePosting() || !this.textContent().trim() && !this.selectedImage()) {
      return; // Do not post empty content
    }

    const formData = new FormData();

    formData.append('textContent', this.textContent());
    if (this.selectedImage()) {
      formData.append('image', this.selectedImage()!, this.selectedImage()!.name);
    }

    this.loading.set(true);

    this.postService.createPost(formData)
    .pipe(
      finalize(() =>
        this.loading.set(false)
      )
    )
    .subscribe({
      next: (post: PostDto) => {
        this.textContent.set("");
        this.removeSelectedImage();
        this.postStore.addPost(post)
      },
      error: (err) => {
        console.error("Error creating post:"+ err.message);
      },
    });
  }

  openImageSelector(): void {
    this.fileInput.nativeElement.click();
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage.set(input.files[0]);
      this.imagePreviewUrl.set(URL.createObjectURL(input.files[0]));
    }
  }

  removeSelectedImage(): void {
    this.selectedImage.set(null);
    this.imagePreviewUrl.set(null);
    this.fileInput.nativeElement.value = '';
  }
}
