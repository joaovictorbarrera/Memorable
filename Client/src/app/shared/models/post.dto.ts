import { CommentDto } from "./comment.dto";

export interface PostDto {
    postId: string;
    textContent: string;
    imageUrl?: string;
    createdAt: Date;
    userId: string;

    // Additional fields can be added as needed
    username: string
    displayName: string;
    userProfileImageUrl: string;
    likeCount: number;
    isLikedByCurrentUser: boolean;
    initialComments?: CommentDto[];
    commentPageCount: number;
    commentCount: number;
}
