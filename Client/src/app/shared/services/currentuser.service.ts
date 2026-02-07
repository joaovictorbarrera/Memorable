import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
  private readonly apiUrl = `${environment.apiUrl}/User`

  private _loading: WritableSignal<boolean> = signal(false);

  constructor(private http: HttpClient) {}

  checkLogin(onLoad: (user: UserDto) => void, onError: (error: any) => void) {
    // Prevent duplicate API calls
    if (this._loading()) return;

    this._loading.set(true);

    return this.http
      .get<UserDto>(`${this.apiUrl}/AuthUserGet`)
      .subscribe({
        next: onLoad,
        error: onError,
        complete: () => this._loading.set(false)
      });
  }
}
