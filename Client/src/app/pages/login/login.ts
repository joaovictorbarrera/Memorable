import { Component, computed, signal } from '@angular/core';
import { Card } from "../../shared/components/card/card";
import { AuthService } from '../../shared/services/auth.service';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [Card, SlicePipe],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  haveAccount = signal(true)
  errorList = signal<string[]>([]);
  profileFile = signal<File | null>(null);
  profileFileName = signal<string | null>(null);
  profilePreviewUrl = signal<string | null>(null);
  success = signal(false)

  emailRegex = /(?:[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+(?:\.[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9\x2d]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  constructor(private authService: AuthService) {
  }

  login(formEvent: Event): void {
    formEvent.preventDefault();

    // TODO: API call to log in user

    this.authService.checkLogin()
  }

  register(formEvent: Event) {
    formEvent.preventDefault();

    if (!this.inputValidation(formEvent)) return;

    // Build form data and include profile image if present
    const form = formEvent.target as HTMLFormElement;
    const fd = new FormData(form);
    const file = this.profileFile();
    if (file) fd.set('profileImage', file, file.name);

    // TODO: send fd to API to register user

    this.errorList.set([])
    this.success.set(true)
  }

  toggleHaveAccount() {
    this.haveAccount.set(!this.haveAccount())
    this.success.set(false)
    this.profileFile.set(null)
    const profileUrl = this.profilePreviewUrl()
    if (profileUrl) URL.revokeObjectURL(profileUrl)
    this.profilePreviewUrl.set(null)
    this.profileFileName.set(null)
    this.errorList.set([])
  }

  inputValidation(formEvent: Event) {
    const form = formEvent.target as HTMLFormElement;
    const errors: string[] = [];

    const emailInput = form.querySelector("[name=email]") as HTMLInputElement | null;
    if (!emailInput || !emailInput.value) {
      errors.push('Email is required.');
    } else if (!new RegExp(this.emailRegex).test(emailInput.value)) {
      errors.push('Invalid email address.');
    }

    const usernameInput = form.querySelector("[name=username]") as HTMLInputElement | null;
    if (!usernameInput || !usernameInput.value) {
      errors.push('Username is required.');
    } else if (usernameInput.value.length < 5 || usernameInput.value.length > 20) {
      errors.push('Username must be between 5 and 20 characters.');
    }

    const passwordInput = form.querySelector("[name=password]") as HTMLInputElement | null;
    if (!passwordInput || !passwordInput.value) {
      errors.push('Password is required.');
    } else {
      if (passwordInput.value.length < 8) {
        errors.push('Password must be at least 8 characters long');
      }
      if (!new RegExp(/[0-9]/g).test(passwordInput.value)) {
        errors.push('Password must contain at least one number')
      }
      if (!new RegExp(/[A-Z]/).test(passwordInput.value)) {
        errors.push('Password must contain at least one capital letter')
      }
      if (!new RegExp(/[!@#$%^*()_+\-=\[\]{}|\\,.?:-]/).test(passwordInput.value)) {
        errors.push('Password must contain at least one special character')
      }
    }

    const firstNameInput = form.querySelector("[name=firstName]") as HTMLInputElement | null;
    if (!firstNameInput || !firstNameInput.value) {
      errors.push('First name is required.');
    } else if (firstNameInput.value.length < 2) {
      errors.push('Invalid First Name');
    }

    const lastNameInput = form.querySelector("[name=lastName]") as HTMLInputElement | null;
    if (!lastNameInput || !lastNameInput.value) {
      errors.push('Last name is required.');
    } else if (lastNameInput.value.length < 2) {
      errors.push('Invalid Last Name');
    }

    const profilePictureInput = form.querySelector("[name=profileImage]") as HTMLInputElement | null;
    if (!profilePictureInput || !profilePictureInput.files || profilePictureInput.files.length < 1) {
      errors.push('Profile Image is required.');
    }

    if (errors.length) {
      this.errorList.set(errors);
      return false;
    }

    return true;
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
}
