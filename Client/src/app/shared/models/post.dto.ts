import { CommentDto } from "./comment.dto";

export interface PostDto {
    postId: string;
    textContent: string;
    createdAt: Date;
    userId: string;
    imageUrl?: string;

    // Additional fields can be added as needed
    username: string;
    userProfileImageUrl: string;
    likeCount: number;
    isLikedByCurrentUser: boolean;
    comments: CommentDto[];
}
