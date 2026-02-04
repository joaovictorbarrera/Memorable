import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
  private readonly apiUrl = `${environment.apiUrl}/User`

  private _user = signal<UserDto | null>(null);
  private _loading = signal(false);

  user = computed(() => this._user());
  loading = computed(() => this._loading());

  constructor(private http: HttpClient) {}

  loadUser(userId: number) {
    // Prevent duplicate API calls
    if ((this._user() && this._user()?.userId === userId) || this._loading()) return;

    this._loading.set(true);

    this.http
      .get<UserDto>(`${this.apiUrl}/UserGetById?UserId=${userId}`)
      .subscribe({
        next: user => this._user.set(user),
        complete: () => this._loading.set(false)
      });
  }
}
