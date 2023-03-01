import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import Post from '../models/post_model'
import User from '../models/user_model'

let newPostMessage = 'This is the new test post message'
let newPostSenderId = '63fe3f0acab896037ee03bbc'
let NewPostSenderName = 'Elie'
let newPostId = ''
let newPostphoto = ""
let newPostMessageUpdated = 'Elie123'

const userEmail = "user1@gmail.com"
const userPassword = "12345"
let accessToken = ''

beforeAll(async ()=>{
    const res = await request(app).post('/auth/register').send({
        "username": userEmail,
        "password": userPassword 
    })
    newPostSenderId = res.body._id
})

async function loginUser() {
    const response = await request(app).post('/auth/login').send({
        "username": userEmail,
        "password": userPassword 
    })
    accessToken = response.body.accessToken
}

beforeEach(async ()=>{
    await loginUser()
})

afterAll(async ()=>{
    await User.remove({ username: userEmail })
    mongoose.connection.close()
})

describe("Posts Tests", ()=>{
    test("add new post",async ()=>{
        const response = await request(app).post('/post').set('Authorization', 'JWT ' + accessToken)
        .send({
            "message": newPostMessage,
            "senderId": newPostSenderId,
            "senderName": NewPostSenderName,
            "photo": newPostphoto
        })
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(newPostMessage)
        expect(response.body.senderId).toEqual(newPostSenderId)
        expect(response.body.senderName).toEqual(NewPostSenderName)
        expect(response.body.photo).toEqual(newPostphoto)
        newPostId = response.body._id
    })

    test("get all posts",async ()=>{
        const response = await request(app).get('/post').set('Authorization', 'JWT ' + accessToken)
        expect(response.statusCode).toEqual(200)
        // expect(response.body[0].message).toEqual(newPostMessageUpdated)
        // expect(response.body[0].senderId).toEqual(newPostSenderId)
        // expect(response.body[0].senderName).toEqual(NewPostSenderName)
        // expect(response.body[0].photo).toEqual(newPostphoto)
    })

    test("get post by id",async ()=>{
        const response = await request(app).get('/post/' + newPostId).set('Authorization', 'JWT ' + accessToken)
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(newPostMessage)
        expect(response.body.senderId).toEqual(newPostSenderId)
        expect(response.body.senderName).toEqual(NewPostSenderName)
        expect(response.body.photo).toEqual(newPostphoto)
    })

    test("get post by wrong id fails",async ()=>{
        const response = await request(app).get('/post/12345').set('Authorization', 'JWT ' + accessToken)
        expect(response.statusCode).toEqual(400)
    })

    test("get post by sender",async ()=>{
        const response = await request(app).get('/post?sender=' + newPostSenderId).set('Authorization', 'JWT ' + accessToken)
        expect(response.statusCode).toEqual(200)
        expect(response.body[0].message).toEqual(newPostMessage)
        expect(response.body[0].senderId).toEqual(newPostSenderId)
        expect(response.body[0].senderName).toEqual(NewPostSenderName)
        expect(response.body[0].photo).toEqual(newPostphoto)
    })

    test("update post by ID",async ()=>{
        let response = await request(app).put('/post/' + newPostId).set('Authorization', 'JWT ' + accessToken)
        .send({
            "message": newPostMessageUpdated
        })
        console.log('test update body: ' + JSON.stringify(response.body));
        
        expect(response.statusCode).toEqual(200)

        response = await request(app).get('/post/' + newPostId).set('Authorization', 'JWT ' + accessToken)
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(newPostMessageUpdated)
        expect(response.body.senderId).toEqual(newPostSenderId)
        expect(response.body.senderName).toEqual(NewPostSenderName)
        expect(response.body.photo).toEqual(newPostphoto)

        response = await request(app).put('/post/12345').set('Authorization', 'JWT ' + accessToken)
        .send({
            "message": newPostMessageUpdated,
            "senderId": newPostSenderId,
            "senderName": NewPostSenderName,
            "photo": newPostphoto
        })
        expect(response.statusCode).toEqual(400)
    })

    test("delete post test", async () => {
        const response = await request(app).delete('/post/delete/' + newPostId).set('Authorization', 'JWT ' + accessToken)
        expect(response.statusCode).toEqual(200)
        const found = await request(app).get('/post/' + newPostId)
        expect(found.body.length).toEqual(undefined)
    })
})