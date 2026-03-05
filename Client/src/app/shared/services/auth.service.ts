import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GlobalService } from '../../core/state/global';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/Auth`

  private _loading = signal(false);
  readonly loading = this._loading.asReadonly();

  constructor(private http: HttpClient, public globalService: GlobalService) {}

  login(body: { username: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, body)
      .pipe(
        tap(res => {
          localStorage.setItem('jwt_token', res.token);
        })
      );
  }

  logout() {
    localStorage.removeItem('jwt_token');
    this.globalService.user.set(null);
    this._loading.set(false);
  }

  checkLogin() {
    // Prevent duplicate API calls
    if (this.loading()) return;

    this._loading.set(true);

    return this.http
      .get<UserDto>(`${this.apiUrl}/AuthUserGet`)
      .subscribe({
        next: (user) => {
          this.OnUserLoaded(user)
          this._loading.set(false)
        },
        error: (err) => {
          this.logout()
          this._loading.set(false)
        }
      });
  }

  OnUserLoaded(user: UserDto) {
    if (user) {
      this.globalService.user.set(user);
    }
  }
}
