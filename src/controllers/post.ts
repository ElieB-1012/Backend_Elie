
import Post from '../models/post_model'
//import response from "../socket/response"
import error from "../socket/error"
import request from "../socket/request"
import { response, Error } from '../Utils'
import {ObjectId} from 'mongodb'



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
        const id = req.params.id
        const message = req.body.message
        const image = req.body.image
        const post = await Post.updateOne({_id: new ObjectId(id)}, {$set :{photo: image, message: message}})

        console.log("" + post)
        return new response(post, req.userId, null)
    } catch (err) {
        return new response(null, req.userId, new error(400, err.message))
    }
}

const deletePost = async (req) => {
    try {
        const post = await Post.deleteOne({_id: new ObjectId(req.params.id)})
        console.log(`Post ${req.params.id} was deleted`);
        return new response(post, req.userId, null)
    } catch(err){
        console.log('Fail to delete');
    }
}

export = {getAllPosts, addNewPost, getPostById, putPostById, deletePost}
