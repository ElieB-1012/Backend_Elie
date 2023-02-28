import User from '../models/user_model'
import { response, Error } from '../Utils'

const getUsers = async (req = null) => {
    try {
        const users = await User.find()
        return new response(users, null, null)
    } catch (err) {
        return new response(null, null, new Error(400, err.message))
    }
}

const getUserById = async (req: { params: { id: any } }) => {
    try {
        const user = await User.findById(req.params.id)
        return new response(user, null, null)
    } catch (err) {
        return new response(null, null, new Error(400, err.message))
    }
}

const updateUser = async (req) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return new response(user, req.userId, null)
    } catch (err) {
        return new response(null, req.userId, new Error(400, err.message))
    }
}

export = { getUsers, getUserById, updateUser }