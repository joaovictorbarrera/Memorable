import { Component, computed, OnInit, signal } from '@angular/core';
import { Card } from "../../shared/components/card/card";
import { AuthService } from '../../shared/services/auth.service';
import { SlicePipe } from '@angular/common';
import { RegisterForm } from "./register-form/register-form";
import { LoginForm } from "./login-form/login-form";
import { PasswordReset } from "./password-reset/password-reset";

@Component({
  selector: 'app-login',
  imports: [Card, RegisterForm, LoginForm, PasswordReset],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  haveAccount = signal(true)
  passwordResetMode = signal(false)

  ngOnInit(): void {
    const url = new URL(window.location.href);
    const resetToken = url.searchParams.get('resetToken');
    if (resetToken) {
      this.passwordResetMode.set(true)
    }
  }

  toggleHaveAccount() {
    this.haveAccount.set(!this.haveAccount())
  }

  disableResetMode() {
    this.passwordResetMode.set(false)
  }
}
