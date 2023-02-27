
import Post from '../models/post_model'
import response from "../socket/response"
import error from "../socket/error"
import request from "../socket/request"



const getAllPosts = async (req = null)=>{
    try {
        let posts = {}
        if (req == null || req.body.sender == null) {
            posts = await Post.find()
        } else {
            posts = await Post.find({'senderId': req.body.sender})
        }
        return new response(posts, null, null)
    } catch (err) {
        return new response(null, null, new error(400, err.message))
    }
}

const getPostById = async (req)=>{
    try {
        console.log('get there ' + JSON.stringify(req))
        const post = await Post.findById(req.params.id)
        return new response(post, null, null)
    } catch (err) {
        return new response(null, null, new error(400, err.message))
    }
}


const addNewPost = async (req)=>{
    const post = new Post({
        message: req.body.message,
        senderId: req.body.senderId,
        senderName: req.body.senderName,
        photo: req.body.photo
    })

    try {
        const newPost = await post.save()
        console.log("WHY NOT")
        return new response(newPost, req.userId, null)
    } catch (err) {
        return new response(null, req.userId, new error(400, err.message))
    }
}


const putPostById = async (req)=>{
    try {
        console.log('req update')
        console.log(req)
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
        console.log(post)
        return new response(post, req.userId, null)
    } catch (err) {
        return new response(null, req.userId, new error(400, err.message))
    }
}


export = {getAllPosts, addNewPost, getPostById, putPostById}
