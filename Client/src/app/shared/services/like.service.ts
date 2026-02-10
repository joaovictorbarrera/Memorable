import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private readonly apiUrl = `${environment.apiUrl}/like`;
  constructor(private http: HttpClient) {}

  /**
   * CREATE like
   */
  createLike(postId: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/LikeCreate`,
      { postId }
    );
  }

  /**
   * DELETE like
   */
  deleteLike(postId: string): Observable<any> {
    const params = new HttpParams()
      .set('postId', postId);

    return this.http.delete(
      `${this.apiUrl}/LikeDelete`,
      { params }
    );
  }
}
