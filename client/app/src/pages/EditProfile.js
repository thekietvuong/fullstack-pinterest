import React, { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { Navbar } from "../components/Navbar";
import { jwtDecode } from 'jwt-decode'
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editUserAPI, getUserAPI } from "../utility/fetchAPI";

export const EditProfile = () => {

    const [image, setImage] = useState();
    const [avatar, setAvatar] = useState();
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token).data;

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);
        };
    };

    useEffect(() => {
        const input = document.querySelector("#formFile");
        input.addEventListener("change", (event) => {
            setAvatar(event.target.files[0]);
        });
    }, []);

    //Chỉnh sửa thông tin cá nhân
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('avatar', avatar);
        formData.append('full_name', name + " " + lastname);
        formData.append('birthday', birthday);

        editUserAPI(formData, token)
            .then((res) => {
                toast.success(res + "😃!", {
                    position: "top-center"
                });
            }).catch(err => {
                toast.error(err.response.data, "Invalid Details 👎!", {
                    position: "top-center"
                });
            });
    };

    const handleCancel = () => {
        navigate(-1);
    }

    //get thông tin user
    useEffect(() => {
        let decodedToken = jwtDecode(token).data;
        getUserAPI(decodedToken.user_id, token)
            .then(res => {
                setUser(res);
            })
            .catch(err => {
                toast.error(err.response.data + " 👎!", {
                    position: "top-center"
                });
            });
    }, []);

    return (
        <div >
            <Navbar />
            <div className="edit_profile_page">
                <div className="sidebar">
                    <h3
                        style={{
                            textDecoration: "underline",
                            textUnderlineOffset: "8px",
                            textDecorationThickness: "3px"
                        }}
                    >Edit profile</h3>
                    <h3>Account management</h3>
                    <h3>Tune your home feed</h3>
                    <h3>Claimed accounts</h3>
                    <h3>Social permissions</h3>
                    <h3>Notifications</h3>
                    <h3>Privacy and data</h3>
                    <h3>Security</h3>
                    <h3>Branded Content</h3>
                </div>
                <div className="edit_container">
                    <h1>Edit Profile</h1>
                    <p>Keep your personal details private. Information you add here is visible to any who can view your profile.</p>
                    <div className="avatar">
                        {image
                            ? <img src={image} className="avatar-edit" alt="Avatar" />
                            : <div className="pseudo_avatar" />
                        }
                        <input type="file" name="image" accept="image/*" id="formFile" onChange={handleImageUpload} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">First name</label>
                        <input type="text" id="name" value={name}
                            placeholder={user ? user.full_name.split(" ")[0] : ""}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Last name</label>
                        <input type="text" id="lastname" value={lastname}
                            placeholder={user ? user.full_name.split(" ")[1] : ""}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthday">Birthday</label>
                        <input type="date" id="birthday" value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </div>

                    <ToastContainer />
                </div>
            </div>
            <div className="edit-buttons">
                <button type="submit" onClick={handleSubmit}>Lưu</button>
                <NavLink to={`/userinfo/${decodedToken.user_id}`}>
                    <button type="button" onClick={handleCancel}>Hủy</button>
                </NavLink>
            </div>
        </div>
    )
}
