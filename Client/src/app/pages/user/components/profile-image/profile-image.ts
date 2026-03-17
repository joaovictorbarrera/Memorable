import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-profile-image',
  imports: [CommonModule, MatIcon],
  templateUrl: './profile-image.html',
  styleUrl: './profile-image.scss',
})
export class ProfileImage {
  @Input() imageUrl!: string | undefined;
  @Input() editable: boolean = false;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    // Instant preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);

    // Upload to API
    const formData = new FormData();
    formData.append('file', file);

    // TODO: API Call
  }
}
