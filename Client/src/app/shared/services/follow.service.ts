import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private readonly apiUrl = `${environment.apiUrl}/follow`;
  constructor(private http: HttpClient) {}

  /**
   * FOLLOW
   */
  follow(userId: string): Observable<any> {
    const params = new HttpParams()
        .set('userId', userId);

    return this.http.post(
      `${this.apiUrl}/FollowCreate`,
      null,
      { params }
    );
  }

  /**
   * UNFOLLOW
   */
  unfollow(userId: string): Observable<any> {
    const params = new HttpParams()
      .set('userId', userId);

    return this.http.delete(
      `${this.apiUrl}/FollowDelete`,
      { params }
    );
  }
}
