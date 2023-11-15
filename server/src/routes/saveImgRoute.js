import express from 'express';
import { checkAPI } from '../config/jwt.js';
import {saveImg, savedYet, getSavedImg} from "../controllers/saveImgController.js"

const saveImgRoute = express.Router();

// Lưu ảnh
saveImgRoute.post("/save-image", checkAPI, saveImg)

// Get thông tin ảnh đã lưu chưa
saveImgRoute.get("/save-image", checkAPI, savedYet)

// Get danh sách ảnh đã lưu theo user ID
saveImgRoute.get("/get-saved-images/:user_id", checkAPI, getSavedImg)

export default saveImgRoute;