import axios from 'axios'
const BASE_URL = "http://localhost:8080"

const options = (token) => ({
    headers: {
      'X-RapidAPI-Host': 'pinterest.p.rapidapi.com',
      'token': token
    },
});

// Đăng ký
export const userSignUpAPI = async (model) => {
    const { data } = await axios.post(`${BASE_URL}/users/sign-up`, model);
    return data;
}

// Đăng nhập
export const userLoginAPI = async (model) => {
    const { data } = await axios.post(`${BASE_URL}/users/login`, model);
    return data;
}

//*Trang chủ
// get danh sách ảnh
export const getImagesAPI = async () => {
    const { data } = await axios.get(`${BASE_URL}/images/get-images`);
    return data;
}

//Get tìm kiếm danh sách ảnh theo tên 
export const findImagesAPI = async (params) => {
    const { data } = await axios.get(`${BASE_URL}/images/find-images`, {params: params});
    return data;
}

//*Trang chi tiết
//Get thông tin ảnh và người tạo ảnh bằng id ảnh
export const imageDetailsAPI = async (img_id, token) => {
    const { data } = await axios.get(`${BASE_URL}/images/image-details/${img_id}`, options(token));
    return data;
}

//Get thông tin bình luận theo id ảnh
export const getCommentAPI = async (img_id, token) => {
    const { data } = await axios.get(`${BASE_URL}/comments/get-comment/${img_id}`, options(token));
    return data;
}

// Lưu ảnh
export const saveImgAPI = async (model, token) => {
    const { data } = await axios.post(`${BASE_URL}/saveImg/save-image`, model, options(token));
    return data;
}

// Get thông tin ảnh đã lưu chưa
export const savedYetAPI = async (img_id, token) => {
    const { data } = await axios.get(`${BASE_URL}/saveImg/save-image?image_id=${img_id}`, options(token));
    return data;
}

// Post thông tin bình luận theo của người dùng với hình ảnh
export const postCommentAPI = async (model, token) => {
    const { data } = await axios.post(`${BASE_URL}/comments/post-comment`, model, options(token));
    return data;
}

//*Trang quản lý ảnh
// Get thông tin user
export const getUserAPI = async (user_id, token) => {
    const { data } = await axios.get(`${BASE_URL}/users/${user_id}`, options(token));
    return data;
}

// Get danh sách ảnh đã tạo và đã lưu theo user ID
export const getUserImgAPI = async (url, token) => {
    const { data } = await axios.get(`${BASE_URL + url}`, options(token));
    return data;
}

// xóa ảnh đã tạo
export const deleteImageAPI = async (image_id, token) => {
    const { data } = await axios.delete(`${BASE_URL}/images/delete-image/${image_id}`, options(token));
    return data;
}

//*Trang thêm ảnh
// upload ảnh
export const uploadImageAPI = async (formData, token) => {
    const { data } = await axios.post(`${BASE_URL}/images/upload-image`, formData, options(token));
    return data;
}

//*Trang chỉnh sửa thông tin cá nhân
export const editUserAPI = async (formData, token) => {
    const { data } = await axios.put(`${BASE_URL}/users/edit-user`, formData, options(token));
    return data;
}