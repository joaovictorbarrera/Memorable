import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login-form',
  imports: [],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  @Output() needRegistering = new EventEmitter<boolean>();

  constructor(private authService: AuthService) {}

  login(formEvent: Event): void {
    formEvent.preventDefault();

    // TODO: API call to log in user

    this.authService.checkLogin()
  }
}
