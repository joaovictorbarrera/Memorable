export default interface User {
    username: string,
    firstName: string,
    lastName: string,
    pfp: string
}

export interface SearchedUser {
    userExists: boolean,
    auth: boolean,
    user: User
}
