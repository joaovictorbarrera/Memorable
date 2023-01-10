import mongoose from "mongoose"

const followSchema = new mongoose.Schema({
    follower: {
        type: String,
        required: true
    },
    following: {
        type: String,
        required: true
    },
    followedAt: {
        type: Number,
        required: true,
        default: () => Date.now()
    }
})

export default mongoose.model("follows", followSchema)
