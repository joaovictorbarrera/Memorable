export default async function signUserOut() {
    await fetch(process.env.REACT_APP_SIGNOUT, {
        method: "DELETE",
        credentials: "include"
    })
}