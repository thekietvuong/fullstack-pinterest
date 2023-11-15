import express from 'express';
import { checkAPI } from '../config/jwt.js';
import { getImages, findImages, imageDetails, getImagesByUserId, deleteImage, uploadImage } from "../controllers/imageController.js"
import { upload } from '../controllers/imgUtils.js';

const imageRoute = express.Router();

// get danh sách ảnh
imageRoute.get("/get-images", getImages)

//Get tìm kiếm danh sách ảnh theo tên 
imageRoute.get("/find-images", findImages)

//Get thông tin ảnh và người tạo ảnh bằng id ảnh
imageRoute.get("/image-details/:id", checkAPI, imageDetails)

// get danh sách ảnh đã tạo theo userid
imageRoute.get("/get-images/:user_id", checkAPI, getImagesByUserId)

// xóa ảnh đã tạo
imageRoute.delete("/delete-image/:image_id", checkAPI, deleteImage)

// upload ảnh
imageRoute.post("/upload-image", checkAPI, upload.single("file"), uploadImage)

export default imageRoute;