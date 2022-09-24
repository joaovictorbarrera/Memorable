export default function queryUser(username) {
    const users = [
        {
            username:"drag", 
            pfp:"https://i.pinimg.com/originals/bb/9d/29/bb9d291ac6bd9447505ae4799ba8fad3.jpg", 
            content:null
        }
    ]

    return users.find(user => user.username === username)
}