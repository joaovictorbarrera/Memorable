export interface CommentDto {
    commentId: string;
    postId: string;
    userId: string;
    textContent: string;
    createdAt: Date;

    // Additional fields can be added as needed
    username: string;
    displayName: string;
    userProfileImageUrl: string;
}
