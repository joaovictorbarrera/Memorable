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

  constructor(private userService: CurrentUserService,
    private globalVars: GlobalService) {}

  ngOnInit() {
    const userId = this.globalVars.userId();
    this.userService.loadUser(userId);
  }
}
