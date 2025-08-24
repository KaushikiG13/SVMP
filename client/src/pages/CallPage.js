import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { Card, Input, Button } from 'antd';

const CallPage = () => {
    const [link, setLink] = useState('');
    const navigate = useNavigate();
    const INFO = JSON.parse(localStorage.getItem("userInfo"));

    const handleSubmituser = ()=>{
        // Retrieve the JSON string from localStorage
        const userInfoString = localStorage.getItem("userInfo");

        // Parse the JSON string to an object
        const userInfo = JSON.parse(userInfoString);
        console.log(userInfo);
        console.log(userInfo.username);

        // Check if userInfo and username exist

         
        if (userInfo && userInfo.username) {
    // Set input to the value of the key 'username'
    navigate(`/room/${userInfo.username}`);
    } else {
        console.error("The key 'username' does not exist in the userInfo object.");
}
    }
    const handleSubmitadmin = () => {
        if (link) {
            window.location.href = link;
        }
    };
    

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ cursor: 'pointer' }}>
                <Card title={(INFO && INFO.username === "user")?"Join a meet":"Create a meet"} bordered={false} style={{ width: 300 }}>
                    <p>Card content</p>
                    <Input
                        placeholder="Enter link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                    <Button type="primary" onClick={(INFO && INFO.username === "user")? handleSubmitadmin:handleSubmituser}>
                        Join
                    </Button>
                </Card>
            </div>
        </div>

    );
}
export default CallPage