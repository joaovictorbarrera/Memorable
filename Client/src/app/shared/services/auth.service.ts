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
  private refreshTimeout: any;

  constructor(private http: HttpClient, public globalService: GlobalService) {}

  login(body: FormData) {
    return this.http 
      .post<{ accessToken: string; refreshToken: string }>(`${this.apiUrl}/login`, body)
      .pipe(
        tap(res => {
          if (res.accessToken && res.refreshToken) {
            localStorage.setItem('access_token', res.accessToken);
            localStorage.setItem('refresh_token', res.refreshToken);

            this.scheduleRefresh(res.accessToken);
          }
        })
      );
}

  register(body: FormData) {
    return this.http.post(`${this.apiUrl}/register`, body);
  }

  forgotPassword(body: FormData) {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/forgot-password`,
      body
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }

    this.globalService.user.set(null);
    this._loading.set(false);
  }

  resetPassword(body: FormData) {
    return this.http.post(`${this.apiUrl}/reset-password`, body);
  }

  checkLogin() {
    if (this.loading()) return;

    const token = localStorage.getItem('access_token');

    if (!token) {
      this.logout();
      return;
    }

    this.scheduleRefresh(token);

    this._loading.set(true);

    return this.http
      .get<UserDto>(`${this.apiUrl}/AuthUserGet`)
      .subscribe({
        next: (user) => {
          this.globalService.user.set(user);
          this._loading.set(false);
        },
        error: () => {
          this.logout();
          this._loading.set(false);
        }
      });
  }

  refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
      this.logout();
      return;
    }

    return this.http
      .post<{ accessToken: string; refreshToken: string }>(
        `${this.apiUrl}/refresh`,
        { refreshToken }
      )
      .pipe(
        tap(res => {
          localStorage.setItem('access_token', res.accessToken);
          localStorage.setItem('refresh_token', res.refreshToken);

          this.scheduleRefresh(res.accessToken);
        })
      );
  }

  private getTokenExpiration(token: string): number {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000;
  }

  private scheduleRefresh(token: string) {
    const expires = this.getTokenExpiration(token);

    const timeout = expires - Date.now() - 30000; // refresh 30s early

    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }

    this.refreshTimeout = setTimeout(() => {
      this.refreshToken()?.subscribe();
    }, timeout);
  }
}
