export default async function signUserOut() {
    await fetch(`${import.meta.env.VITE_BASE_URL}/signout` as string, {
        method: "DELETE",
        credentials: "include"
    })
}
