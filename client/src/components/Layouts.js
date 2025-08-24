import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import {
  BookOutlined,
  WechatOutlined,
  PlusOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  Card,
  Modal,
  Input,
  Button,
  Form,
  List,
  message
} from "antd";
import axios from 'axios'; // Import Axios to make HTTP requests

const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;
// Initialize the useNavigate hook

axios.defaults.baseURL = 'http://localhost:5000';

function getItem(label, key, icon, link, children) {
  return {
    key,
    icon,
    children,
    label,
    link,
  };
}

const Layouts = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [teams, setTeams] = useState(["Team 1", "Team 2"]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [addedUsers, setAddedUsers] = useState([]);
  const [chatGroups, setChatGroups] = useState([]);

  const info = JSON.parse(localStorage.getItem("userInfo"));
  const showModal = () => {
    setIsModalVisible(true);
  };
  let userName = "User";
  if(info && info.username){
    userName = info.username;
  }

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const token = localStorage.getItem("usertoken");
      const response = await axios.get("/api/v1/chat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      if (response.data) {
        setChatGroups(response.data);
      }
    } catch (error) {
      console.error("Error fetching chat groups:", error);
    }
  };
  // Handle form submission
const handleOk = async () => {
  try {
    await form.validateFields(); // Validate the form fields

    const { groupName } = form.getFieldsValue(); // Get the team name from the form

    // Extract user IDs from addedUsers
    const userIds = addedUsers.map(user => user._id);

    // Create the group payload
    const groupPayload = {
      name: groupName,
      users: JSON.stringify(userIds), // Convert user IDs to JSON string
    };

    const response = await axios.post("/api/v1/chat/group", groupPayload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("usertoken")}`, // Include JWT token in the headers
      },
    });

    // Close the modal and show success message
    form.resetFields();
    setAddedUsers([]);
    handleCancel();
    message.success('Group chat created successfully');
  } catch (error) {
    console.error('Error creating group chat:', error);

    if (error.response && error.response.data && error.response.data.message) {
      // Display the exact error message returned by the backend
      message.error(error.response.data.message);
    } else {
      // Fallback to a generic error message
      message.error('Failed to create group chat');
    }
  }
};



  const handleMenuClick = ({ key }) => {
    const selectedItem = menuItems.flat().find((item) => item.key === key);
    if (selectedItem && selectedItem.link) {
      navigate(selectedItem.link);
    }
    if (key.startsWith("sub2")) {
      // Extract the chatId from the key
      const chatId = key.split("_")[1];
      navigate(`/chats/${chatId}`); // Navigate to the selected chat
    }
  };



  const handleCancel = () => {
    setIsModalVisible(false);
    setSearchResults([]);
    setAddedUsers([]);
  };

  

  // Handle search for users
  const searchUsers = async () => {
    try {
      setSearchResults([]);
      const token = localStorage.getItem("usertoken");
      console.log(token);

      // Make a GET request to the backend API endpoint with the search query
      const response = await axios.get(`/api/v1/chat/search?regNo=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in the headers
        },
      });

      if (response.data.success) {
        console.log("Search successful");
        setSearchResults(response.data.data);
      } else {
        console.error("Error searching users:", response.data.message);
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Error searching users:", error.message);
      message.error(error.response.data.message);
    }
  };
  // Handle adding a user to the team
  const handleAddUser = (user) => {
    if (!addedUsers.find((u) => u._id === user._id)) {
      setAddedUsers([...addedUsers, user]);
    }
  };

  // Handle removing a user from the team
  const handleRemoveUser = (userId) => {
    setAddedUsers(addedUsers.filter((user) => user._id !== userId));
  };


 
  const menuItems = [
    {label:userName, key: "sub1", icon: <UserOutlined />,children:[
      getItem("Dashboard", "1",),
      getItem("Update profile", "2"),
      getItem("Reset Password", "3",),
      getItem("Logout", "4"),
    ]},
    {
      key: "sub2",
      label: (
        <div>
        {/* <TeamOutlined style={{ marginRight: 8 }} /> */}
          <span>Groups</span>
          {(info && info.role === "admin") && <PlusOutlined style ={{paddingLeft: 30, transform: "translateY(0%)"}}onClick={() => showModal()} />}
        </div>
      ),
      icon: <TeamOutlined />,
      children: chatGroups.map(chat => ({ label: chat.chatName, key: chat._id })),
    },
    getItem("Meet", "7", <WechatOutlined />, "/call"),
    getItem("Resources", "8", <BookOutlined />, "/resources"),
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width="300"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={menuItems}
          onClick={handleMenuClick}
/>
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            background: "#1679AB",
          }}
        >
          <h1 style={{ margin: 0, color: "white" }}>SVMP</h1>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "6px 0" }}></Breadcrumb>
          <div>{children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          CreatiO(n) Coders ©{new Date().getFullYear()} Created by the Best
          Developers
        </Footer>
        <Modal
          title="Create Group"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelButtonProps={{
            style: { background: "red", borderColor: "red" },
          }}
          width={600}
          style={{ fontSize: "20px" }}
        >
          <Form form={form} layout="vertical">
            {/* Team Name Input */}
            <Form.Item
              name="groupName"
              label="Group Name"
              rules={[{ required: true, message: 'Please enter a group name' }]}
            >
              <Input placeholder="Enter team name" />
            </Form.Item>

            {/* Search Users Input */}
            <Form.Item label="Search Users">
              <Input.Search
                placeholder="Search user"
                enterButton
                style={{ padding: '12px', color: 'gray', borderColor: 'black' }}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSearch={searchUsers}
              />
            </Form.Item>

            {/* Display search results */}
            <List
              dataSource={searchResults}
              renderItem={(user) => (
                <List.Item
                  key={user._id}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}
                >
                  <div style={{ fontWeight: "normal" }}>{user.username} - {user.regno}</div>
                  <Button onClick={() => handleAddUser(user)}>Add</Button>
                </List.Item>
              )}
            />

            {/* Add a gap between search results and added users */}
            <div style={{ marginTop: "16px" }}></div>

            {/* Display added users */}
            <Form.Item label={<b>Added Users</b>}>
              {addedUsers.map((user) => (
                <div key={user._id} style={{ marginBottom: "8px" }}>
                  {user.username} - {user.regno}
                  <Button type="link" onClick={() => handleRemoveUser(user._id)}>Remove</Button>
                </div>
              ))}
            </Form.Item>

          </Form>


        </Modal>
      </Layout>
      <style>
        {`
          Input.Search::placeholder {
            color: gray;
            font-size: 16px; 
          }
          Input.Search:hover {
            border-color: black; 
          }
        `}
      </style>
    </Layout>
  );
};

export default Layouts;
