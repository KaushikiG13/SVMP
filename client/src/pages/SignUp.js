import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, message, Spin, Modal, Form, Input } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000';

export default function SignUp() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [info, setInfo] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
        regno: "",
        email: "",
        role: "user"
    });
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    function GoogleAuth() {
        console.log("Google auth link working");
    }

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    function handlechange(event) {
        const { name, value } = event.target;
        setInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("submitted biatch");
        console.log(info);
        try {
            console.log("aman");

            const response = await axios.post('/api/v1/users/verifysignup', info);
            setLoading(false);
            if (response.data.success) {
                console.log("response.data");
                messageApi.open({
                    type: 'success',
                    content: 'OTP Sent Successfully',
                    duration: 2,
                });

                setModal(true);
            } else {
                messageApi.open({
                    type: 'error',
                    content: response.data.message,
                    duration: 2,
                });

            }

        } catch (error) {
            setLoading(false);
            console.error('Registration error:', error);
            messageApi.open({
                type: 'error',
                content: error.response.data.message,
                duration: 2,
            });

        }
    };

    //OTP VERIFICATION
    const handleOTPSubmit = async (values) => {

        setLoading(true);
        console.log("submitted biatch");
        console.log(values.otp);
        const otp = values.otp;
        try {
            console.log("aman");

            const response = await axios.post('/api/v1/users/signup', {otp});
            setLoading(false);
            console.log(response.data);
            if (response.data.success === true) {
                console.log(response.data);
                setModal(false);
                messageApi.open({
                    type: 'success',
                    content: 'Registration Successful....',
                    duration: 2,
                });
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
                
            }else {
                messageApi.open({
                    type: 'error',
                    content: response.data.message,
                    duration: 2,
                });

            }

        } catch (error) {
            setLoading(false);
            console.error('Registration error:', error);
            messageApi.open({
                type: 'error',
                content: error.response.data.message,
                duration: 2,
            });

        }
    };

    return (
        <div>
            <Spin
                spinning={loading}
                indicator={
                    <LoadingOutlined
                        style={{
                            fontSize: 24,
                        }}

                    />
                }
                fullscreen
            />
            {contextHolder}
            <Modal
                title="To ensure secure signup, verification is required"
                centered
                open={modal}
                footer={false}
                onCancel={() => setModal(false)}
            >
                <Form layout="vertical"
                    onFinish={handleOTPSubmit}>
                    <Form.Item label="Enter 6 digit OTP sent to your email address" name="otp">
                        <Input placeholder="OTP" type="number" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>

            </Modal>
            <div class="box-form">
                <div class="left">
                    <div class="overlay">
                        <h1>SVMP SIGNUP</h1>

                        <span onClick={GoogleAuth}>Signup with Google</span>
                    </div>
                </div>

                <div class="right">
                    <h5>Sign-Up</h5>
                    <div class="inputs">
                        <input
                            type="email"
                            placeholder="E-mail"
                            name="email"
                            value={info.email}
                            onChange={handlechange}
                        />
                        <input
                            type="text"
                            placeholder="Name"
                            name="username"
                            value={info.username}
                            onChange={handlechange}
                        />
                        <input
                            type="number"
                            placeholder="Registration Number"
                            name="regno"
                            value={info.regno}
                            onChange={handlechange}
                        />
                        <br />
                        <div className="password-input-container">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={info.password}
                                onChange={handlechange}
                            />
                            <div className="eye-icon" onClick={togglePasswordVisibility}>{passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}</div>
                        </div>
                        <input
                            type="password"
                            name="passwordConfirm"
                            placeholder="Confirm Password"
                            value={info.ConfirmPassword}
                            onChange={handlechange}
                        />
                    </div>
                    <br />
                    <br />
                    

                    <br />
                    <button className="loginkru" onClick={handleSubmit}>
                        Sign-Up
                    </button>
                </div>
            </div>
        </div>
    );
}
