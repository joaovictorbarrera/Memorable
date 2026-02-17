import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}/User`

  constructor(private http: HttpClient) {}

    getUserByUsername(username: string): Observable<UserDto> {

        const params = new HttpParams()
      .set('username', username);

        return this.http
        .get<UserDto>(`${this.apiUrl}/UserGetByUsername`, { params })
    }

}
