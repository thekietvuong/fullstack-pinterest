import fs from 'fs'
import multer, { diskStorage } from 'multer';

export const upload = multer({
    storage: diskStorage({
        destination: process.cwd() + "/public/img",
        filename: (req, file, callback) => {
            let newName = new Date().getTime() + "_" + file.originalname;
            callback(null, newName);
        }
    }),
});

export const imageToBase64 = (file) => {
    let data = fs.readFileSync(process.cwd() + "/public/img/" + file.filename);
    let base64 = `data:${file.mimetype};base64,` + Buffer.from(data).toString("base64");
    // Kiểm tra xem tệp ảnh có tồn tại không
    if (fs.existsSync(process.cwd() + "/public/img/" + file.filename)) {
        // Xóa tệp ảnh
        fs.unlinkSync(process.cwd() + "/public/img/" + file.filename);
    }
    return base64
}