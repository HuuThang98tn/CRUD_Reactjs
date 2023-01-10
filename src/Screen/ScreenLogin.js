import React, { useState } from 'react'
import "../styles/Styles.css"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const ScreenLogin = () => {
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [authenticated, setauthenticated] = useState(
        localStorage.getItem(localStorage.getItem("authenticated"))
    );
    const errors = {
        uname: "Sai email đăng nhập",
        pass: "Sai password đăng nhập"
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        var data = JSON.stringify({
            "email": email,
            "password": password
        });

        var config = {
            method: 'post',
            url: 'http://localhost:3000/api-v1/users/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data.result[0].accesstoken));
                if (response.data.code === 200) {
                    setIsSubmitted(true);
                    const accesstoken = response.data.result[0].accesstoken
                    // setauthenticated(accesstoken)
                    localStorage.setItem("authenticated", response.data.result[0].accesstoken);
                    navigate("/todolist");

                }
            })
            .catch(function (error) {
                alert("Đã có lỗi xảy ra")
                setIsSubmitted(false);
            });
    }
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );


    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Tài khoản </label>
                    <input type="text" onChange={(e) => setEmail(e.target.value)} required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Mật khẩu </label>
                    <input type="password" name="pass" onChange={(e) => setPassword(e.target.value)} required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit"
                    />
                </div>
            </form>
        </div>
    );
    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Đăng nhập</div>
                {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            </div>
        </div>
    )
}

export default ScreenLogin