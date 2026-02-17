import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ProfileIcon } from '../../../shared/components/profile-icon/profile-icon';
import { GlobalService } from '../../state/global';
import { toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { debounceTime, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [RouterModule, MatIconModule, ProfileIcon, CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {

  query = signal('');
  suggestions = signal<any[]>([]);
  loading = signal(false);

  constructor(private userService: UserService, public globalService: GlobalService) {
    this.loading.set(true);
    toObservable(this.query)
      .pipe(
        tap(() => this.loading.set(true)),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(q => {
          if (!q.trim()) return of([]);
          return this.userService.getUserByUsernameQuery(q);
        })
      )
      .subscribe(users => {
        this.suggestions.set(users);
        this.loading.set(false);
      });
  }

  ngOnInit() {

  }

  clearSearch() {
    this.query.set('');
    this.suggestions.set([]);
  }

  onUserClick() {
    this.clearSearch();
  }
}
