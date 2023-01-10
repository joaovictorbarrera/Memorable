import mongoose from "mongoose"

export default async function(mongoURL: string) {
    try {
        await mongoose.connect(mongoURL)
        console.log("mongodb connected")
    } catch (e: any) {
        console.log(e.message)
        process.exit(1)
    }
}
