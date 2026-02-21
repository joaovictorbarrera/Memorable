import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GlobalService } from '../../core/state/global';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/Auth`

  private loading = signal(false);

  constructor(private http: HttpClient, public globalService: GlobalService) {}

  checkLogin() {
    // Prevent duplicate API calls
    if (this.loading()) return;

    this.loading.set(true);

    return this.http
      .get<UserDto>(`${this.apiUrl}/AuthUserGet`)
      .subscribe({
        next: (user) => this.OnUserLoaded(user),
        error: (err) => this.OnFailedToLoadUser(err),
        complete: () => this.loading.set(false)
      });
  }

  OnUserLoaded(user: UserDto) {
    if (user) {
      this.globalService.user.set(user);
    }
  }

  OnFailedToLoadUser(err: any) {
    this.globalService.user.set(null);
    // Redirect to login page or show an error message
  }

  logout() {
    this.globalService.user.set(null);
    // TODO: call backend logout endpoint to invalidate refresh token
  }
}
