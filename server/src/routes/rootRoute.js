import express from 'express';
import userRoute from './userRoute.js';
import imageRoute from './imageRoute.js';
import commentRoute from './commentRoute.js';
import saveImgRoute from './saveImgRoute.js';

const rootRoute = express.Router();

rootRoute.use("/users", userRoute);
rootRoute.use("/images", imageRoute);
rootRoute.use("/comments", commentRoute);
rootRoute.use("/saveImg", saveImgRoute);

export default rootRoute;