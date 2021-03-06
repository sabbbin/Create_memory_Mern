import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creater: String,
    tags: [String],
    selectedfile: String,
    likeCount: {
        type: Number,
        default:0
    },
    createdAt: {
        type: Date,
        default:new Date()
    }
    
});

const PostMessage = mongoose.model('postmessage', postSchema);

export default PostMessage;