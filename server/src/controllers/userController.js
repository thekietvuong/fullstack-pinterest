import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import bcrypt from "bcrypt";
import { createToken, checkToken, decodeToken } from "../config/jwt.js";
import { imageToBase64 } from "./imgUtils.js";

const model = initModels(sequelize);

//Đăng ký
const userSignUp = async (req, res) => {
    let { email, password, passwordg, full_name, birthday, avatar } = req.body;

    let checkEmail = await model.users.findAll({
        where: {
            email: email
        }
    })

    if (!email || !password || !full_name || !birthday) {
        res.status(500).json("You need to enter complete information");
        return;
    } else if (checkEmail.length > 0) {
        res.status(500).json("This user is already present");
        return;
    } else if (password !== passwordg) {
        res.status(500).json("Please re-enter the correct password");
        return;
    }

    let newPass = bcrypt.hashSync(password, 10);

    let newData = {
        email,
        password: newPass,
        full_name,
        birthday,
        avatar
    }

    await model.users.create(newData)

    res.send("Registration Successfully done");
}

//Đăng nhập
const userLogin = async (req, res) => {
    let { email, password } = req.body;

    if (!email) {
        res.status(500).json("You have not entered your email yet !");
        return;
    } else if (!password) {
        res.status(500).json("You have not entered your password yet !");
        return;
    }

    let checkUser = await model.users.findOne({
        where: {
            email: email
        }
    })

    if (checkUser) {
        let checkPass = bcrypt.compareSync(password, checkUser.password);

        if (checkPass) {
            let token = createToken({
                user_id: checkUser.user_id,
                email: checkUser.email,
                password: checkUser.password,
            });
            checkUser.password = "";
            res.send({
                user: checkUser,
                token: token
            });
        } else {
            res.status(500).json("Email or password is incorrect !")
        }
    } else {
        res.status(500).json("Email or password is incorrect !");
    }
}

//get thông tin user
const getUser = async (req, res) => {
    let { token } = req.headers;
    let { user_id } = req.params;

    try {
        const user = decodeToken(token).data;
        if (user_id == user.user_id) {
            const data = await model.users.findOne({
                where: {
                    user_id: user.user_id
                }
            });
            res.status(200).json(data);
        } else {
            res.status(500).json("You are not authorized to access")
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

//sửa thông tin user
const editUser = async (req, res) => {
    let avatar = req.file;
    let { token } = req.headers;

    try {
        let newAvatar = imageToBase64(avatar);
        let { full_name, birthday } = req.body;

        // Tìm user theo id
        const getUser = await model.users.findOne({
            where: {
                user_id: checkToken(token).data.user_id
            }
        });

        // update
        let updateUser = { ...getUser, full_name, birthday, avatar: newAvatar };
        await model.users.update(updateUser, {
            where: {
                user_id: checkToken(token).data.user_id
            }
        });

        res.send("Update successful");
    } catch (err) {
        res.status(500).json(err)
    }
}

export {
    userSignUp,
    userLogin,
    getUser,
    editUser
}