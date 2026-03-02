import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./core/layout/header/header";
import { AuthService } from './shared/services/auth.service';
import { GlobalService } from './core/state/global';
import { Login } from "./pages/login/login";
import { SpinningWheel } from "./shared/components/spinning-wheel/spinning-wheel";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Login, SpinningWheel],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Memorable');

  constructor(public authService: AuthService, public globalService: GlobalService) {}

  ngOnInit() {
    // TODO: Should be added back when login is implemented
    this.authService.checkLogin();
  }
}
