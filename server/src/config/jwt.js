import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.SECRET_KEY;

//mã hóa data
const createToken = (data) => {
    let token = jwt.sign({data}, secretKey, {expiresIn: "1d"});
    return token;
}

//kiểm tra token
const checkToken = (token) => {
    return jwt.verify(token, secretKey);
}

//giải mã token
const decodeToken = (token) => {
    return jwt.decode(token);
}

export const checkAPI = (req, res, next) => {
    try{
        let {token} = req.headers;
        checkToken(token)
        next();
    }catch{
        res.status(500).send("You are not authorized to access");
    }
}

export {
    createToken,
    checkToken,
    decodeToken
}