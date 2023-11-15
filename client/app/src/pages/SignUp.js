import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
// import "./SignUpSignIn.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userSignUpAPI } from '../utility/fetchAPI';


export const SignUp = () => {

    //chuyển hướng về homepage nếu đang đăng nhập
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    })

    const [udata, setUdata] = useState({
        email: "",
        full_name: "",
        birthday: "",
        password: "",
        passwordg: ""
    })

    const addData = (e) => {
        const { name, value } = e.target;
        setUdata(() => {
            return {
                ...udata,
                [name]: value
            }
        })
    }

    const senddata = async (e) => {
        e.preventDefault();

        const { email, full_name, birthday, password, passwordg } = udata;

        userSignUpAPI({ email, full_name, birthday, password, passwordg })
            .then(res => {
                setUdata({
                    ...udata, full_name: "", email: "",
                    birthday: "", password: "", passwordg: ""
                });
                toast.success(res + " 😃!", {
                    position: "top-center"
                });
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
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" alt="signupimg" />
                    </div>
                    <form>
                        <h1>Create An Account</h1>
                        <div className='form_data'>
                            <input
                                type="text" name="email"
                                id="email"
                                placeholder='Email'
                                value={udata.email}
                                onChange={addData}
                            />
                        </div>
                        <div className='form_data'>
                            <input
                                type="text"
                                name="full_name"
                                id="full_name"
                                placeholder='Your name'
                                value={udata.full_name}
                                onChange={addData}
                            />
                        </div>

                        <div className='form_data'>
                            <input
                                type="date"
                                name="birthday"
                                id="birthday"
                                value={udata.birthday}
                                onChange={addData}
                            />
                        </div>
                        <div className='form_data'>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder='Password'
                                value={udata.password}
                                onChange={addData}
                            />
                        </div>
                        <div className='form_data'>
                            <input
                                type="password"
                                name="passwordg"
                                id="passwordg"
                                placeholder='Confirm Password'
                                value={udata.passwordg}
                                onChange={addData}
                            />
                        </div>
                        <button className='signin_btn' onClick={senddata}>Continue</button>

                        <div className="signin_info">
                            <p>Already have an account?</p>
                            <NavLink to="/signin" style={{ color: "#E41E27" }}>Sign in</NavLink>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </section>
    )
}
