import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Sequelize } from "sequelize";
import { decodeToken } from "../config/jwt.js";
import { imageToBase64 } from "./imgUtils.js";

const model = initModels(sequelize);
const Op = Sequelize.Op;

const getImages = async (req, res) => {
    let data = await model.images.findAll();
    res.send(data);
}

const findImages = async (req, res) => {
    let { findName } = req.query;
    console.log(req.query);
    // Tìm ảnh theo tên
    const data = await model.images.findAll({
        where: {
            image_name: {
                [Op.like]: `%${findName}%`
            }
        }
    });

    res.send(data);
}

//Get thông tin ảnh và người tạo ảnh bằng id ảnh
const imageDetails = async (req, res) => {
    let { id } = req.params;

    try {
        let data = await model.images.findOne({
            where: {
                image_id: id,
            },
            include: ["users"]
        });
        res.status(200).json(data);

    } catch (err) {
        res.status(500).json(err)
    }
}

const getImagesByUserId = async (req, res) => {
    let { user_id } = req.params;
    let { token } = req.headers;

    try {
        const user = decodeToken(token).data;
        if (user.user_id == user_id) {
            let img = await model.images.findAll({
                where: {
                    user_id: user.user_id,
                },
            })
            if (img) {
                res.status(200).json(img);
            } else {
                res.status(404).json("There are no photos here");
            }
        } else {
            res.status(500).json("You cannot view the list of other users' created photos");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
}

const deleteImage = async (req, res) => {
    let { image_id } = req.params;
    try {
        //nếu tấm ảnh đã được lưu thì xóa trong bảng "ảnh được lưu" trước
        await model.save_image.destroy({
            where: {
                image_id
            },
        });

        //nếu tấm ảnh đã có người bình luận thì xóa trong bảng "bình luận" trước
        await model.comments.destroy({
            where: {
                image_id
            },
        });

        await model.images.destroy({
            where: {
                image_id
            },
        });

        //Trả về danh sách ảnh sau khi xóa
        let data = await model.images.findAll();
        res.send(data);
    } catch (err) {
        res.status(500).send("You cannot delete photos because " + err);
    }

}

// upload ảnh
const uploadImage = async (req, res) => {
    let file = req.file;
    let { image_name, image_desc } = req.body;
    let { token } = req.headers;

    try {
        const user = decodeToken(token).data;
        let imgBase = imageToBase64(file);
        await model.images.create({
            image_name,
            image_path: imgBase,
            image_desc,
            user_id: user.user_id
        })
        res.send(imgBase);

    } catch (err) {
        res.status(500).json(err)
    }
}

export {
    getImages,
    findImages,
    imageDetails,
    getImagesByUserId,
    deleteImage,
    uploadImage
}