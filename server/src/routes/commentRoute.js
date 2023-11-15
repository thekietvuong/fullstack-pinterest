import express from 'express';
import { checkAPI } from '../config/jwt.js';
import {getComment, postComment} from "../controllers/commentController.js"

const commentRoute = express.Router();

// get thông tin bình luận theo id ảnh
commentRoute.get("/get-comment/:imageId", checkAPI, getComment)

// post thông tin bình luận theo của người dùng với hình ảnh
commentRoute.post("/post-comment", checkAPI, postComment)


export default commentRoute;