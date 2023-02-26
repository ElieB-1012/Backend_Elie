import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        required: true
    }
})

export = mongoose.model('post', PostSchema)