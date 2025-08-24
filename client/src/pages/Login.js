import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, message, Spin, Modal, Form, Input,Switch } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000';

export default function SignUp() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [isAdmin, setIsAdmin] = useState(false);
    const [info, setInfo] = useState({
        email: "",
        password: "",
        role: ""
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
            console.log(isAdmin);
            if (isAdmin){
              info.role = "admin";
            }
            else{
              info.role = "user";
            }
            const response = await axios.post('/api/v1/users/verifylogin', info);
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

            const response = await axios.post('/api/v1/users/login', {otp});
            setLoading(false);
            console.log(response.data);
            if (response.data.success === true) {
                console.log(response.data);
                setModal(false);
                messageApi.open({
                    type: 'success',
                    content: 'Login Successful....',
                    duration: 2,
                });
                
                localStorage.setItem("userInfo",  JSON.stringify(response.data.user));
                localStorage.setItem("usertoken", response.data.token);
                // console.log(localStorage.getItem(userInfo));
                setTimeout(() => {
                    const INFO = JSON.parse(localStorage.getItem("userInfo"));
                    if(INFO && INFO.role){
                        if(INFO.role === "user"){
                            navigate('/features');
                        }else{
                            navigate('/mentor');
                        }
                    }
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
            console.error('Login error:', error);
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
                title="To ensure secure login, verification is required"
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
                        <h1>SVMP LOGIN</h1>

                        <span onClick={GoogleAuth}>Login with Google</span>
                    </div>
                </div>

                <div class="right">
                    <h5>Login</h5>
                    <div class="inputs">
                        <input
                            type="email"
                            placeholder="E-mail"
                            name="email"
                            value={info.email}
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
                    </div>
                    <Switch checkedChildren="Mentor" unCheckedChildren="Student"
                            checked = {isAdmin}
                            onChange={(checked)=>{
                              // console.log("checked:", checked); 
                              setIsAdmin(checked);
                              // console.log(isAdmin);
                            }}
                    ></Switch>
                    <br />
                    <br />
                    <div class="remember-me--forget-password">
                        <Button type="link">forgot password?</Button>
                    </div>

                    <br />
                    <button className="loginkru" onClick={handleSubmit}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}
