import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { UserService } from '../../../../shared/services/user.service';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-profile-image',
  imports: [CommonModule, MatIcon],
  templateUrl: './profile-image.html',
  styleUrl: './profile-image.scss',
})
export class ProfileImage {
  @Input() imageUrl!: string | undefined;
  @Input() editable: boolean = false;
  @Output() userUpdated = new EventEmitter()

  profilePreviewUrl = signal<string | null>(null);
  constructor(private userService: UserService, private authService: AuthService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input || !input.files) return;
    const file = input.files[0] ?? null;

    const prev = this.profilePreviewUrl();

    // Revoke previous preview URL if present
    if (prev) URL.revokeObjectURL(prev);

    this.profilePreviewUrl.set(URL.createObjectURL(file));
    this.save(file)
  }

  save(file: File) {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    this.userService.uploadProfileImage(formData).subscribe({
      next: (res) => {
        this.userUpdated.emit();
        this.authService.checkLogin()
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
