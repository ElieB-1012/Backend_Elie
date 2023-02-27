import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    refresh_tokens:{
        type: [String]
    }
})

export = mongoose.model('User',userSchema)

