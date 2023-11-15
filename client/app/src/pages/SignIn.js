import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
// import "./SignUpSignIn.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { userLoginAPI } from '../utility/fetchAPI';

export const SignIn = () => {

    //chuyển hướng về homepage nếu đang đăng nhập
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    })

    const dispatch = useDispatch();
    const [logdata, setData] = useState({
        email: "",
        password: "",
    })

    const addData = (e) => {
        const { name, value } = e.target;
        setData(() => {
            return {
                ...logdata,
                [name]: value
            }
        })
    }

    const senddata = async (e) => {
        e.preventDefault();

        const { email, password } = logdata;

        userLoginAPI({ email, password })
            .then(res => {
                setData({ ...logdata, email: "", password: "" })
                localStorage.setItem("token", res.token);
                navigate("/");
            }).catch(err => {
                toast.error(err.response.data, {
                    position: "top-center"
                });
            });
    }

    return (
        <section>
            <div className='sign_container'>
                <div className='sign_form'>
                    <div className="sign_header">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" alt="signinimg" />
                    </div>
                    <form method='POST'>
                        <h1>Welcome to Pinterest</h1>
                        <div className='form_data'>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                onChange={addData}
                                placeholder='Email'
                                value={logdata.email}
                            />
                        </div>
                        <div className='form_data'>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                onChange={addData}
                                placeholder='Password'
                                value={logdata.password}
                            />
                        </div>
                        <button className='signin_btn' onClick={senddata}>Continue</button>
                    </form>
                    <ToastContainer />
                </div>
                <div className="create_accountinfo">
                    <p>New to Pinterest?</p>
                    <NavLink to="/signup"> <button>  Create your Pinterest Account </button></NavLink>
                </div>
            </div>
        </section>
    )
}
