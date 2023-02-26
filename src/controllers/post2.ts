
import post from '../models/post2_model'
import { Request, Response } from 'express'



const getAllPosts = async (req: Request, res: Response) => {
    console.log('getAllPosts backend')

    try {
        let posts = {}
        posts = await post.find()
        res.status(200).send(posts)
    } catch (err) {
        res.status(400).send({ 'error': "fail to get posts from db" })
    }
}

const getStudentById = async (req: Request, res: Response) => {
    console.log(req.params.id)
    try {
        const students = await post.findById(req.params.id)
        res.status(200).send(students)
    } catch (err) {
        res.status(400).send({ 'error': "fail to get posts from db" })
    }
}


const addNewPost = async (req: Request, res: Response) => {
    console.log(req.body)

    const post2 = new post({
        _id: req.body._id,
        name: req.body.name,
        avatarUrl: req.body.avatarUrl,
    })

    try {
        const newPost = await post2.save()
        console.log("save student in db")
        res.status(200).send(newPost)
    } catch (err) {
        console.log("fail to save student in db " + err)
        res.status(400).send({ 'error': 'fail adding new post to db' })
    }
}


export = { getAllPosts, getStudentById, addNewPost }
