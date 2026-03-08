import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { FormSubmittedEvent } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidation } from '../../../shared/utilities/validation';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-password-reset',
  imports: [],
  templateUrl: './password-reset.html',
  styleUrl: './password-reset.scss',
})
export class PasswordReset implements OnInit {
  @Output() doneResetting = new EventEmitter<boolean>(true);

  error = signal<null | string>(null);

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const url = new URL(window.location.href);
    const email = url.searchParams.get('email');
    const resetToken = url.searchParams.get('resetToken');

    if (!email || !resetToken) this.returnToLogin()
  }

  resetPassword(event: Event) {
    event.preventDefault()

    this.error.set(null)

    const form = event.target as HTMLFormElement

    const passwordInput = form.querySelector("[name=newPassword]") as HTMLInputElement | null
    const verifyPasswordInput = form.querySelector("[name=verifyPassword]") as HTMLInputElement | null

    if (!passwordInput || !verifyPasswordInput) {
      this.error.set("Fill all fields")
      return
    }

    if (passwordInput.value !== verifyPasswordInput.value) {
      this.error.set("Passwords do not match")
      return
    }

    const validationErrors = passwordValidation(passwordInput.value)
    if (validationErrors.length > 0) {
      this.error.set(validationErrors[0])
      return
    }

    const fd = new FormData()
    const url = new URL(window.location.href);
    const email = url.searchParams.get('email')
    const resetToken = url.searchParams.get('resetToken');

    if (!email || !resetToken || !passwordInput.value) {
      this.error.set("Missing Required Parameters")
      return
    }

    fd.append("email", email)
    fd.append("password", passwordInput.value)
    fd.append("token", resetToken)

    this.authService.resetPassword(fd).subscribe({
      next: () => {
        this.returnToLogin()
      },
      error: (err: any) => {
        console.log(err)
        this.error.set(err?.error[0]?.description)
      }
    });
  }

  returnToLogin() {
    this.router.navigate([], {
      queryParams: {},
      replaceUrl: true
    });

    this.doneResetting.emit()
  }
}
