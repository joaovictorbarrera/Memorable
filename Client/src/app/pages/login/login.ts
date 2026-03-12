import { Component, computed, OnInit, signal } from '@angular/core';
import { Card } from "../../shared/components/card/card";
import { RegisterForm } from "./register-form/register-form";
import { LoginForm } from "./login-form/login-form";
import { PasswordReset } from "./password-reset/password-reset";
import { ForgotPassword } from "./forgot-password/forgot-password";

@Component({
  selector: 'app-login',
  imports: [Card, RegisterForm, LoginForm, PasswordReset, ForgotPassword],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  hasAccount = signal(true)

  forgotPasswordMode = signal(false)
  passwordResetMode = signal(false)

  ngOnInit(): void {
    const url = new URL(window.location.href);
    const resetToken = url.searchParams.get('resetToken');
    if (resetToken) {
      this.passwordResetMode.set(true)
    }
  }

  toggleHasAccount() {
    this.hasAccount.set(!this.hasAccount())
  }

  disableResetMode() {
    this.passwordResetMode.set(false)
  }

  toggleForgotPassword() {
    this.forgotPasswordMode.set(!this.forgotPasswordMode())
  }
}
