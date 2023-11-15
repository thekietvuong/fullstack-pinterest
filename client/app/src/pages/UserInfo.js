import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import { Gallery } from '../components/Gallery.js';
import { Link } from "react-router-dom";
import { Navbar } from '../components/Navbar.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserImgAPI, getUserAPI } from '../utility/fetchAPI.js';
import { getRouteParam } from '../utility/getRouteParam.js';

export const UserInfo = () => {

    const [isEdit, setIsEdit] = useState(false);
    const [user, setUser] = useState({});
    const [images, setImages] = useState([]);
    const [mode, setMode] = useState("Created")
    const [delImg, setDelImg] = useState(false);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    /// Giải mã token
    const decodedToken = jwtDecode(token);
    const userFromToken = decodedToken.data;

    const location = useLocation();

    const handleEditProfile = () => {
        setIsEdit(!isEdit);
    };

    //get thông tin user
    useEffect(() => {
        getUserAPI(getRouteParam(location), token)
            .then(res => {
                setUser(res);
            })
            .catch(err => {
                navigate(-1)
                toast.error(err.response.data + " 👎!", {
                    position: "top-center"
                });
            });
    }, []);

    // Get danh sách ảnh đã tạo và đã lưu theo user ID
    useEffect(() => {
        let url = mode === "Created"
            ? `/images/get-images/${getRouteParam(location)}`
            : `/saveImg/get-saved-images/${getRouteParam(location)}`
        
        getUserImgAPI(url, token)
            .then(res => {
                const newData = [];
                res.map(item => {
                    newData.push(item.images)
                });
                mode === "Created" ? setImages(res) : setImages(newData)
            })
            .catch(err => console.log(err));
        setDelImg(false);
    }, [mode, delImg]);

    return (
        <>
            <Navbar />
            <div className="user-info">
                <div className="avatar">
                    <img src={user.avatar} alt="Avatar" />
                </div>
                <div className="name">
                    <h1>{user.full_name}</h1>
                </div>
                <div className="email">
                    <p>{user.email}</p>
                </div>
                <div className="edit-profile">
                    <Link to={`/edit-profile`}>
                        <button
                            className="edit"
                            onClick={handleEditProfile}
                        >
                            Edit Profile
                        </button>
                    </Link>
                    <Link to={`/upload-image`}>
                        <button
                            className="add-photo"
                            onClick={handleEditProfile}
                        >
                            Add Photo
                        </button>
                    </Link>
                </div>
                <div className="created-saved">
                    <span
                        onClick={() => setMode("Created")}
                        style={{
                            textDecoration: mode === "Created" ? "underline" : "none"
                        }}
                    >Created</span>
                    <span
                        onClick={() => setMode("Saved")}
                        style={{
                            marginLeft: "20px",
                            textDecoration: mode === "Saved" ? "underline" : "none"
                        }}
                    >Saved</span>
                </div>
                <Gallery
                    images={images}
                    edit={mode === "Created" ? "enable" : "disable"}
                    userID={userFromToken.user_id}
                    isDel={setDelImg}
                />
                <ToastContainer />
            </div>
        </>
    )
}
