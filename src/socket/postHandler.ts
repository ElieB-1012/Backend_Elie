
import { Server, Socket } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import postController from "../controllers/post"
import request from "./request"
import error from "./error"
import response from "./response"

export = (io:Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>, 
            socket:Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) => {
                
                const getAllPosts = async () => {
                    try {
                        const response = await postController.getAllPosts()
                        socket.emit('post:get_all.response', response.body)
                    } catch (err) {
                        socket.emit('post:get_all.response', {'status': 'fail'})
                    }
                }
            
                const getPostById = async (req) => {
                    try {
                        const response = await postController.getPostById(new request(req))
                        socket.emit('post:get_by_id.response', response.body)
                    } catch (err) {
                        socket.emit('post:get_by_id.response', { 'status': 'fail' })
                    }
                }
                
                const getPostBySender = async (req) => {
                    try {
                        const response = await postController.getAllPosts(new request(req))
                        socket.emit('post:get_by_sender.response', response.body)
                    } catch (err) {
                        socket.emit('post:get_by_sender.response', { 'status': 'fail' })
                    }
                }
            
                const addNewPost = async (payload) => {
                    try {
                        const response = await postController.addNewPost(new request(payload, payload.sender))
                        socket.emit('post:add_new.response', response.body)
                    } catch (err) {
                        socket.emit('post:add_new.response', { 'status': 'fail' })
                    }
                }
                
                
                const updatePost = async (req) => {
                    try {
                        const response = await postController.putPostById(new request(req.body, null, req.params))
                        console.log(response)
                        socket.emit('post:update_post.response', response.body)
                    } catch (err) {
                        socket.emit('post:update_post.response', { 'status': 'fail' })
                    }
                }

    console.log('register echo handlers')
    socket.on("post:get_all", getAllPosts)
    socket.on("post:get_by_id", getPostById)
    socket.on("post:add_new", addNewPost)
    socket.on("post:get_by_sender", getPostBySender)
    socket.on("post:update_post", updatePost)

}
 