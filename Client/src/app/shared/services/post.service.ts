import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostDto } from '../models/post.dto';
import { environment } from '../../../environments/environment';
import { postPageSize } from '../../core/state/constants';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly apiUrl = `${environment.apiUrl}/post`;
  constructor(private http: HttpClient) {}

  /**
   * GET feed with pagination
   */
  getFeed(pageNumber: number): Observable<PostDto[]> {
    const pageSize = postPageSize;

    const params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber);

    return this.http.get<PostDto[]>(
      `${this.apiUrl}/PostGetFeed`,
      { params }
    );
  }

  /**
   * GET single post by id
   */
  getById(postId: string): Observable<PostDto> {
    const params = new HttpParams()
      .set('postId', postId);

    return this.http.get<PostDto>(
      `${this.apiUrl}/PostGetById`,
      { params }
    );
  }

  /**
   * CREATE post
   */
  createPost(formData: FormData): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/PostCreate`,
      formData
    );
  }

  /**
   * UPDATE post
   */
  updatePost(post: PostDto): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/PostUpdate`,
      post
    );
  }

  /**
   * DELETE post
   */
  deletePost(postId: string): Observable<any> {
    const params = new HttpParams()
      .set('postId', postId);

    return this.http.delete(
      `${this.apiUrl}/PostDelete`,
      { params }
    );
  }
}
