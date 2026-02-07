import { Component, ElementRef, EventEmitter, Output, signal, ViewChild } from '@angular/core';
import { Card } from '../../../../shared/components/card/card';
import { MatIcon } from '@angular/material/icon';
import { ProfileIcon } from '../../../../shared/components/profile-icon/profile-icon';
import { PostButton } from "../post-button/post-button";
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../../shared/services/post.service';
import { GlobalService } from '../../../../core/state/global';

@Component({
  selector: 'app-post-create',
  imports: [Card, MatIcon, ProfileIcon, PostButton, FormsModule],
  templateUrl: './post-create.html',
  styleUrl: './post-create.scss',
})
export class PostCreate {
  postContent = signal<string>("");
  selectedImage = signal<File | null>(null);
  imagePreviewUrl = signal<string | null>(null);

  @Output() refreshFeed = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor (private postService: PostService, public globalService: GlobalService) {}

  post(): void {
    if (!this.postContent().trim() && !this.selectedImage) {
      return; // Do not post empty content
    }

    const formData = new FormData();

    formData.append('textContent', this.postContent());
    if (this.selectedImage()) {
      formData.append('image', this.selectedImage()!, this.selectedImage()!.name);

    }
    this.postService.createPost(formData).subscribe({
      next: () => {
        this.postContent.set("");
        this.removeSelectedImage();
        this.refreshFeed.emit();
      },
      error: (error) => {
        console.error("Error creating post:", error);
      }
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
