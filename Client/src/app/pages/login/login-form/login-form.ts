import { Component, EventEmitter, Output, signal } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { ForgotPassword } from '../forgot-password/forgot-password';
import { SpinningWheel } from "../../../shared/components/spinning-wheel/spinning-wheel";
import { SubmitButton } from "../../../shared/components/submit-button/submit-button";

@Component({
  selector: 'app-login-form',
  imports: [SubmitButton],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  @Output() needRegistering = new EventEmitter<boolean>();

  invalidLogin = signal(false);
  loading = signal(false)

  constructor(private authService: AuthService) {}

  login(formEvent: Event): void {
    this.invalidLogin.set(false)

    formEvent.preventDefault();

    const form = formEvent.target as HTMLFormElement;

    const username = (form.querySelector('input[name="username"]') as HTMLInputElement).value;
    const password = (form.querySelector('input[name="password"]') as HTMLInputElement).value;

    if (!username || !password) return;

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    this.loading.set(true)
    this.authService.login(formData).subscribe({
      next: () => this.authService.checkLogin(),
      error: () => {
        this.invalidLogin.set(true)
        this.loading.set(false)
      },
    });
  }
}
