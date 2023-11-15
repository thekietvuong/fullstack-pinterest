import express from 'express';
import { checkAPI } from '../config/jwt.js';
import { userSignUp, userLogin, getUser, editUser } from '../controllers/userController.js';
import { upload } from '../controllers/imgUtils.js'; 
const userRoute = express.Router();

//đăng ký
userRoute.post("/sign-up", userSignUp);

//đăng nhập
userRoute.post("/login", userLogin);

//get thông tin user
userRoute.get("/:user_id", checkAPI, getUser);

//sửa thông tin user
userRoute.put("/edit-user", checkAPI, upload.single("avatar"), editUser);

export default userRoute;