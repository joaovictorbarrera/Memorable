import { HttpClient, HttpParams } from "@angular/common/http";
import { computed, Injectable, signal } from "@angular/core";
import { environment } from "../../../environments/environment";
import { EMPTY, Observable } from "rxjs";
import { CommentDto } from "../models/comment.dto";
import { PostDto } from "../models/post.dto";
import { commentPageSize } from "../../core/state/constants";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly apiUrl = `${environment.apiUrl}/comment`;
  constructor(private http: HttpClient, private authService: AuthService) {}

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
  deleteComment(commentId: string): Observable<any> {
    const params = new HttpParams()
    .set('commentId', commentId);

    return this.http.delete(
    `${this.apiUrl}/CommentDelete`,
    { params }
    );
  }

  getCommentsByPostId(post: PostDto, skip: number): Observable<CommentDto[]> {
    const pageSize = commentPageSize;

    const params = new HttpParams()
      .set('postId', post.postId)
      .set('pageSize', pageSize.toString())
      .set('skip', skip.toString())
    return this.http.get<CommentDto[]>(`${this.apiUrl}/CommentGetByPostId`, { params });
  }
}
