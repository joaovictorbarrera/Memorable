import bcrypt from "bcrypt"

export async function encryptPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
}

export async function checkPassword(serverPassword: string, clientPassword: string): Promise<boolean> {
    return await bcrypt.compare(clientPassword, serverPassword)
}