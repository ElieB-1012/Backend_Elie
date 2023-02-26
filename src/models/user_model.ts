import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
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

