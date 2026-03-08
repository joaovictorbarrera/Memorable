import { SlicePipe } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { registerValidation } from '../../../shared/utilities/validation';

@Component({
  selector: 'app-register-form',
  imports: [SlicePipe],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm {
  @Output() doneRegistering = new EventEmitter<boolean>(true);

  errorList = signal<string[]>([]);
  profileFile = signal<File | null>(null);
  profileFileName = signal<string | null>(null);
  profilePreviewUrl = signal<string | null>(null);
  success = signal(false)

  constructor(private authService: AuthService) {}

  register(formEvent: Event) {
    formEvent.preventDefault();

    const validationErrors: string[] = registerValidation(formEvent);
    if (validationErrors.length > 0) {
      this.errorList.set(validationErrors)
      return
    }

    const form = formEvent.target as HTMLFormElement;
    const fd = new FormData(form);

    this.authService.register(fd).subscribe({
      next: () => {
        this.errorList.set([]);
        this.success.set(true);
      },
      error: (err) => {
        this.errorList.set(err.error.errors)
      }
    });
  }

  onProfileImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input || !input.files) return;
    const file = input.files[0] ?? null;

    // Revoke previous preview URL if present
    const prev = this.profilePreviewUrl();
    if (prev) URL.revokeObjectURL(prev);

    if (file) {
      this.profileFile.set(file);
      this.profileFileName.set(file.name);
      this.profilePreviewUrl.set(URL.createObjectURL(file));
    } else {
      this.profileFile.set(null);
      this.profilePreviewUrl.set(null);
    }
  }

  clearProfileImage() {
    const prev = this.profilePreviewUrl();
    if (prev) URL.revokeObjectURL(prev);
    this.profileFile.set(null);
    this.profileFileName.set(null);
    this.profilePreviewUrl.set(null);
    // Clear the actual file input if present in DOM
    const el = document.getElementById('profileImageInput') as HTMLInputElement | null;
    if (el) el.value = '';
  }

  moveToLogin() {
    this.success.set(false)
    this.profileFile.set(null)
    const profileUrl = this.profilePreviewUrl()
    if (profileUrl) URL.revokeObjectURL(profileUrl)
    this.profilePreviewUrl.set(null)
    this.profileFileName.set(null)
    this.errorList.set([])
    this.doneRegistering.emit()
  }
}
