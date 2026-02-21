import { Component, computed, signal } from '@angular/core';
import { Card } from "../../shared/components/card/card";
import { AuthService } from '../../shared/services/auth.service';
import { SlicePipe } from '@angular/common';
import { RegisterForm } from "./register-form/register-form";
import { LoginForm } from "./login-form/login-form";

@Component({
  selector: 'app-login',
  imports: [Card, RegisterForm, LoginForm],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  haveAccount = signal(true)

  toggleHaveAccount() {
    this.haveAccount.set(!this.haveAccount())
  }

}
