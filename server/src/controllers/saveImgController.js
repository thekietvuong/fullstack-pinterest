import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Sequelize } from "sequelize";
import { checkToken, decodeToken } from "../config/jwt.js";

const model = initModels(sequelize);

// Lưu ảnh
const saveImg = async (req, res) => {
    let { image_id } = req.body;
    let { token } = req.headers;

    try {
        const user = decodeToken(token).data;
        let checkSaved = await model.save_image.findAll({
            where: {
                user_id: user.user_id,
                image_id: image_id
            }
        })

        if (checkSaved.length > 0) {
            await model.save_image.destroy({
                where: {
                    user_id: user.user_id,
                    image_id: image_id
                },
            });
            res.status(200).json("You have unsaved this photo");
            return;
        } else {
            let newData = {
                user_id: user.user_id,
                image_id,
                saving_date: new Date()
            }

            await model.save_image.create(newData)

            res.status(200).json("Saved image successfully");
        }

    } catch (err) {
        res.status(500).json(err)
    }
}

// Get thông tin ảnh đã lưu chưa
const savedYet = async (req, res) => {
    let { image_id } = req.query;
    let { token } = req.headers;

    try {
        const user = decodeToken(token).data;
        let savedYet = await model.save_image.findOne({
            where: {
                user_id: user.user_id,
                image_id: image_id
            },
        })

        if (savedYet) {
            res.status(200).json(savedYet);
        } else {
            res.status(200).json("Photo has not been saved");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// Get danh sách ảnh đã lưu theo user ID
const getSavedImg = async (req, res) => {
    let { user_id } = req.params;
    let { token } = req.headers;

    try {
        const user = decodeToken(token).data;
        if (user.user_id == user_id) {
            let img = await model.save_image.findAll({
                where: {
                    user_id: user.user_id,
                },
                include: ["images"]
            })

            if (img) {
                res.status(200).json(img);
            } else {
                res.status(404).json("No photos have been saved");
            }
        }else{
            res.status(500).json("You cannot view the list of other users' saved photos");
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

export {
    saveImg,
    savedYet,
    getSavedImg
}