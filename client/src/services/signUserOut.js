export default async function signUserOut() {
    await fetch("http://localhost:4000/signout", {
        method: "DELETE",
        credentials: "include"
    })
}