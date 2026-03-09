import { Component, EventEmitter, Output, signal } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { ForgotPassword } from './forgot-password/forgot-password';

@Component({
  selector: 'app-login-form',
  imports: [ForgotPassword],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  @Output() needRegistering = new EventEmitter<boolean>();

  invalidLogin = signal(false);
  forgotPasswordMode = signal(false)

  constructor(private authService: AuthService) {}

  login(formEvent: Event): void {
    formEvent.preventDefault();

    const form = formEvent.target as HTMLFormElement;

    const username = (form.querySelector('input[name="username"]') as HTMLInputElement).value;
    const password = (form.querySelector('input[name="password"]') as HTMLInputElement).value;

    if (!username || !password) return;

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    this.authService.login(formData).subscribe({
      next: () => this.authService.checkLogin(),
      error: () => this.invalidLogin.set(true)
    });
  }

  toggleForgotPassword() {
    this.forgotPasswordMode.set(!this.forgotPasswordMode())
  }
}
