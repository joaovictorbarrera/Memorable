export default async function signUserOut() {
    await fetch(process.env.REACT_APP_SIGNOUT as string, {
        method: "DELETE",
        credentials: "include"
    })
}