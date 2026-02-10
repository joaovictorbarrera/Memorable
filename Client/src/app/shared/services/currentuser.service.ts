import { HttpClient } from '@angular/common/http';
import { computed, Injectable, Signal, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
  private readonly apiUrl = `${environment.apiUrl}/User`

  private loading = signal(false);

  constructor(private http: HttpClient) {}

  checkLogin(onLoad: (user: UserDto) => void, onError: (error: any) => void) {
    // Prevent duplicate API calls
    if (this.loading()) return;

    this.loading.set(true);

    return this.http
      .get<UserDto>(`${this.apiUrl}/AuthUserGet`)
      .subscribe({
        next: onLoad,
        error: onError,
        complete: () => this.loading.set(false)
      });
  }
}
