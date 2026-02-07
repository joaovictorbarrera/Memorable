import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./core/layout/header/header";
import { CurrentUserService } from './shared/services/currentuser.service';
import { GlobalService } from './core/state/global';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Memorable');

  constructor(private userService: CurrentUserService, private globalService: GlobalService) {}

  ngOnInit() {
    this.userService.checkLogin(this.OnUserLoaded.bind(this), this.OnFailedToLoadUser.bind(this));
  }

  OnUserLoaded(user: UserDto) {
    if (user) {
      this.globalService.user.set(user);
    }
  }

  OnFailedToLoadUser(error: any) {
    console.log('Failed to load user:', error);
    this.globalService.user.set(null);
    // Redirect to login page or show an error message
  }
}
