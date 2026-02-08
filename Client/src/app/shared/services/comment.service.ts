import { HttpClient, HttpParams } from "@angular/common/http";
import { computed, Injectable, signal } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { CommentDto } from "../models/comment.dto";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly apiUrl = `${environment.apiUrl}/comment`;
  private commentsByPost = signal<Map<string, CommentDto[]>>(new Map());

  constructor(private http: HttpClient) {}

  commentsFor(postId: string) {
    return computed(() => this.commentsByPost().get(postId) ?? []);
  }

  add(postId: string, comment: CommentDto) {
    const map = new Map(this.commentsByPost());
    const comments = map.get(postId) ?? [];
    map.set(postId, [...comments, comment]);
    this.commentsByPost.set(map);
  }

  remove(postId: string, commentId: string) {
    const map = new Map(this.commentsByPost());
    const comments = map.get(postId)?.filter(c => c.commentId !== commentId) ?? [];
    map.set(postId, comments);
    this.commentsByPost.set(map);
  }

  clear() {
    this.commentsByPost.set(new Map())
  }

  /**
   * CREATE comment
   */
  createComment(textContent: string, postId:string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/CommentCreate`,
      {
          textContent,
          postId
      }
    );
  }

  /**
   * DELETE comment
   */
  deletePost(commentId: string): Observable<any> {
      const params = new HttpParams()
      .set('commentId', commentId);

      return this.http.delete(
      `${this.apiUrl}/CommentDelete`,
      { params }
      );
  }
}
