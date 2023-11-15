import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Sequelize } from "sequelize";
import { checkToken, decodeToken } from "../config/jwt.js";

const model = initModels(sequelize);
const Op = Sequelize.Op;

// get thông tin bình luận theo id ảnh
const getComment = async (req, res) => {
    let { imageId } = req.params;

    try {
        const data = await model.comments.findAll({
            where: {
                image_id: imageId
            },
            include: ["users"]
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err)
    }
}

// post thông tin bình luận theo của người dùng với hình ảnh
const postComment = async (req, res) => {
    let { image_id, content } = req.body;
    let { token } = req.headers;

    try {
        const user = decodeToken(token).data;
        await model.comments.create({
            user_id: user.user_id,
            image_id,
            comment_date: new Date(),
            content
        })
        res.status(200).json("A comment has been added");
    } catch (err) {
        res.status(500).json(err)
    }
}

export {
    getComment,
    postComment
}