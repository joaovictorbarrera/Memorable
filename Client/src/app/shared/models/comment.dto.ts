export interface CommentDto {
    commentId: number;
    postId: number;
    userId: number;
    textContent: string;
    createdAt: Date;

    // Additional fields can be added as needed
    username: string;
    userProfileImageUrl: string;
}
