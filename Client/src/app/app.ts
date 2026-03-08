import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./core/layout/header/header";
import { AuthService } from './shared/services/auth.service';
import { GlobalService } from './core/state/global';
import { Login } from "./pages/login/login";
import { LoadingAuth } from "./pages/loading-auth/loading-auth";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Login, LoadingAuth],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Memorable');

  passwordResetMode = signal(false)

  constructor(
    public authService: AuthService,
    public globalService: GlobalService
  ) {}

  ngOnInit() {
    const url = new URL(window.location.href);
    const resetToken = url.searchParams.get('resetToken');

    if (resetToken) {
      this.passwordResetMode.set(true);
      return;
    }

    this.authService.checkLogin();
  }
}
