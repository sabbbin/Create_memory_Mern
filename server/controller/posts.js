
import PostMessage from '../models/postmessages.js';

import express from 'express';
import mongoose from 'mongoose';


const router = express.Router();

export const getPosts = async(req, res) => {
    try {
        const postMessage = await PostMessage.find();
        console.log(postMessage)
        res.status(200).json(postMessage)
    }
    catch (error) {
        res.status(404).json({message:error.message})
    }
   
}

export const createPosts = async(req, res) => {
    const body = req.body;
    const newPost = new PostMessage(body);
    try {
        await newPost.save();
        res.status(201).json(newPost)
    }
    catch (error) {
        
        res.status(409).json({message:error.message})
    }
    
}

export  const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with such id ')
    const updatedPost = { creater, title, message, tags, selectedFile, _id: id };
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatePost)
}

export const deletePost = async (req, res) => {
    console.log('hello')
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
     
        return res.status(404).send('no such id of an object')

    await PostMessage.findByIdAndRemove(id);
    res.json({ message: 'post deleted successfully' });
    
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    console.log('nice')
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('no item with such if ')
    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {
        likeCount:post.likeCount + 1
    }, { new: true })
    console.log('hello this is sabin')
    res.json(updatedPost)
}


export default router;