export default function queryUser(username) {
    const users = [
        {
            username:"drag", 
            pfp:"https://i.pinimg.com/originals/bb/9d/29/bb9d291ac6bd9447505ae4799ba8fad3.jpg", 
            content:null
        },
        {
            username:"emily03", 
            pfp:"https://i.pinimg.com/736x/98/2b/d4/982bd4a86fbe0bd5a4d454e1a09a3c99.jpg", 
            content:null
        }
    ]

    return users.find(user => user.username === username)
}