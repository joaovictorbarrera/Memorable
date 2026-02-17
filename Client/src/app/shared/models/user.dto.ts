interface UserDto {
    userId: string;
    displayName: string;
    profileImageUrl: string;
    firstName: string,
    lastName: string,
    createdAt: Date,
    username: string,
    postCount: number,
    followerCount: number,
    followingCount: number,
    IsFollowedByCurrentUser: boolean
}
