import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import { useDispatch } from "react-redux";
import { search } from "./Redux/imageReducer.js"
import { jwtDecode } from 'jwt-decode'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { findImagesAPI, getUserAPI } from '../utility/fetchAPI.js';

export const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState();
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem("token");

    //get thông tin user
    useEffect(() => {
        if(!token){return}
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

    //Get tìm kiếm danh sách ảnh theo tên 
    const searchFn = () => {
        const searchValue = document.getElementById("search").value;
        const params = { findName: searchValue }

        findImagesAPI(params)
            .then(res => {
                dispatch(search(res))
            })
            .catch(err => {
                toast.error(err.response.data + " 👎!", {
                    position: "top-center"
                });
            });
    }

    return (
        <div className='navbar'>
            <div className="left_navbar">
                <Link to={`/`} className="logo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" alt="signinimg" />
                </Link>
                <Link to={`/`} style={{ textDecoration: 'none' }}><h3>Home</h3></Link>
                <h3>News</h3>
                <h3>Following</h3>
            </div>

            <div className="middle_navbar">
                <button onClick={searchFn}>
                    <SearchIcon />
                </button>
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder='Search'
                />
            </div>

            {/* <div onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("LOGIN_USER");
                setUser("");
                navigate("/");
            }}>Log out</div> */}

            {/* <div onClick={() => {
                console.log(user ? "có avatar" : "không avatar")
            }}>Test</div> */}

            <div className="right_navbar">
                {/* <NotificationsIcon />
                <MailIcon /> */}
                {
                    user
                        ? <>
                            <NotificationsIcon />
                            <MailIcon />
                            <div className="navbar_avatar">
                                <img src={user.avatar} onClick={() => { setOpen(!open) }} />

                                <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
                                    <ul>
                                        <Link to={`/userinfo/${user.user_id}`} className="dropdown-item">
                                            <p>Profile</p>
                                        </Link>
                                        <p
                                            className="dropdown-item"
                                            onClick={() => {
                                                localStorage.removeItem("token");
                                                localStorage.removeItem("LOGIN_USER");
                                                setUser("");
                                                navigate("/");
                                            }}
                                        >Log out</p>
                                    </ul>
                                </div>
                            </div></>
                        : <>
                            <Link to={`/signup`} style={{ textDecoration: 'none' }}>
                                <h3>Sign Up</h3>
                            </Link>
                            <Link to={`/signin`} style={{ textDecoration: 'none' }}>
                                <h3>Sign In</h3>
                            </Link>
                        </>
                }
            </div>
            <ToastContainer />
        </div>
    )
}
