import { computed, Injectable, signal } from "@angular/core";
import { PostDto } from "../models/post.dto";
import { CommentDto } from "../models/comment.dto";

@Injectable({ providedIn: 'root' })
export class PostStore {
    private posts = signal<Map<string, PostDto>>(new Map());

    all() {
        return computed(() => Array.from(this.posts().values()));
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
        const map = new Map(this.posts());
        const post = map.get(postId);
        if (!post) return;

        post.comments.push(comment);
        this.posts.set(map);
    }

    removeComment(postId: string, commentId: string) {
        const map = new Map(this.posts());
        const post = map.get(postId);
        if (!post) return;

        post.comments = post.comments.filter(c => c.commentId !== commentId);
        this.posts.set(map);
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
}
