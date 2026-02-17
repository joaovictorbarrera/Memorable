import { computed, Injectable, signal } from "@angular/core";
import { PostDto } from "../models/post.dto";
import { CommentDto } from "../models/comment.dto";

@Injectable({ providedIn: 'root' })
export class PostStore {
    private posts = signal<Map<string, PostDto>>(new Map());
    private comments = signal<Map<string, CommentDto[]>>(new Map());

    all() {
        return computed(() => Array.from(this.posts().values()));
    }

    allPostsForProfile(userId: string) {
        return computed(() => Array
        .from(this.posts().values())
        .filter(p => p.userId === userId)
        .map(post => post.postId));
    }

    clearAll() {
        this.posts.set(new Map());
        this.comments.set(new Map());
    }

    getPost(postId: string) {
        return computed(() => this.posts().get(postId));
    }

    setAll(posts: PostDto[]) {
        const map = new Map<string, PostDto>();
        posts.forEach(p => map.set(p.postId, p));
        this.posts.set(map);
    }

    addPost(post: PostDto) {
        const oldMap = this.posts();
        const map = new Map<string, PostDto>();

        // Add the new post first
        map.set(post.postId, post);

        oldMap.forEach((p, id) => map.set(id, p));

        this.posts.set(map);
    }

    addManyPosts(posts: PostDto[]) {
        const map = new Map<string, PostDto>(this.posts())

        posts.forEach(p => map.set(p.postId, p))

        this.posts.set(map)
    }

    removePost(postId: string) {
        const map = new Map(this.posts());
        map.delete(postId);
        this.posts.set(map);
    }

    setPost(post: PostDto) {
        const map = new Map(this.posts());
        map.set(post.postId, post)
        this.posts.set(map);
    }

    addComment(postId: string, comment: CommentDto) {
        const map = new Map(this.comments());
        const comments = map.get(postId);
        if (!comments) {
            map.set(postId, [comment]);
        } else {
            comments.push(comment);
        }
        this.comments.set(map);
    }

    removeComment(postId: string, commentId: string) {
        const map = new Map(this.comments());
        const comments = map.get(postId);
        if (!comments) return;

        const filteredComments = comments.filter(c => c.commentId !== commentId);
        map.set(postId, filteredComments);
        this.comments.set(map);
    }

    addManyComments(postId: string, comments: CommentDto[]) {
        const map = new Map(this.comments());
        const existingComments = map.get(postId) ?? [];

        existingComments.push(...comments)
        map.set(postId, [...existingComments])

        this.comments.set(map);
    }

    getComments(postId: string) {
        return computed(() => this.comments().get(postId));
    }

    togglePostLike(postId: string) {
        const map = new Map(this.posts());
        const post = map.get(postId);
        if (!post) return;

        if (!post.isLikedByCurrentUser) {
            post.likeCount++
        } else {
            post.likeCount--
        }

        post.isLikedByCurrentUser = !post.isLikedByCurrentUser

        this.posts.set(map);
    }

    isLikedByUser(postId: string) {
        const post = this.posts().get(postId);
        if (!post) return;

        return post.isLikedByCurrentUser
    }
}
