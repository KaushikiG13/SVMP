import React, { useState } from "react";
import { Collapse, Divider } from "antd";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Row, Col, Image } from "antd";
import { IoDiamondSharp } from "react-icons/io5";
import { GitlabOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import{useNavigate} from "react-router-dom";
const { Meta } = Card;
import { Carousel } from "antd";
import { Breadcrumb, Layout, Menu, theme, Dropdown } from "antd";
import one from "./../resources/one.png"
import black from "./../resources/black.jpg"
import blue from "./../resources/blue.jpg"
import second from "./../resources/2nd.png"
import haha from "./../resources/haha-01.jpg"
import hands from "./../resources/hands.png"
import vc from "./../resources/vc.png"
const { Header, Content, Footer } = Layout;
const items = [
  { key: "1", label: "Login", link: '/login'},
  { key: "2", label: "Signup", link: '/signup' },
  { key: "3", label: "About Us", link:'/aboutUs'},
];
const { Panel } = Collapse;

const YourComponent = () => {
  const [activePanel, setActivePanel] = useState(null);

  const handlePanelChange = (key) => {
    setActivePanel(activePanel === key ? null : key);
  };
  const navigate = useNavigate();
  const cardContainerStyle = {
    display: "flex", // Use flexbox
    justifyContent: "space-around", // Distribute items with equal space around them
    padding: "20px", // Add padding to the container
  };
  const circleImageStyle = {
    borderRadius: "50%", // Set border radius to 50% to make it circular
    width: "100px", // Adjust width and height as needed
    height: "100px",
  };

  const circleCardStyle = {
    textAlign: "center", // Center align content
  };

  const circleMetaStyle = {
    textAlign: "center", // Center align content
  };
  const ContentStyle = {
    height: "450px",
    color: "#fff",
    lineHeight: "420px",
    textAlign: "center",
    background: "#364d79",
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
  };
  const logoStyle = {
    color: "#8ed1fc", // Set the color to #8ed1fc
    marginRight: "5px",
    paddingTop: "5px",
    marginTop: "0px",
    // Adjust margin as needed
  };
  
  const images = [
    haha,
    hands,
    one,
    vc
  ];

  const dropdownMenu = (label) => (
    <Menu>
      {label === "What we do" && (
        <>
        <Menu.Item 
  key="3" 
  onClick={() => {
    const panel = document.getElementById("active-panel-1");
    if (panel) {
      panel.scrollIntoView({ behavior: "smooth" });
    }
  }}
>
  QUESTIONS FOR US
</Menu.Item>
        </>
      )}
      {label === "Who we are" && (
        <>
          <Menu.Item key="4">ABOUT US</Menu.Item>
        </>
      )}
      {label === "Library resource" && (
        <>
         <Menu.Item key="7" onClick={() => navigate('/login')}>RESOURCE HUB</Menu.Item>
        </>
      )}
    </Menu>
  );
  const handleMenuItemClick = (key) => {
    const selectedItem = items.find(item => item.key === key);
    if (selectedItem) {
      navigate(selectedItem.link);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#132f45" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          padding: "0px",
          background: "#132f45",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end", // Added to align items to the right
        }}
      >
        <div className="demo-logo" />
        <Menu
          onClick={({ key }) => handleMenuItemClick(key)}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items.map((item) => ({
            ...item,
            style: {
              // borderRadius: "2px",
              // height:50, // Round corners
              margin: "0px", // Space between items
              background: "#132f45", // Custom background color
              color: "#ffffff", // Text color
              padding: "10px 20px", // Padding inside each item
            },
          }))}
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            backgroundColor:"4a90e2",
            justifyContent: "flex-end", // Ensures menu items are on the right
            border: "none", // Removes any borders
          }}
        >
        </Menu>
      </Header>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 70px",
          padding: "0 15px",
          height: "80px",
          background: "#142f44",
          color: "#ffffff", //   borderRadius: borderRadiusLG,
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "40px",
            fontFamily: "Gotham SSm A, Gotham SSm B",
            margin: "0 25px",
            padding: "0 20px 0 0",
          }}
        >
          <div>
            <IoDiamondSharp style={logoStyle} />
            MENTOR
          </div>
        </div>
        <Dropdown overlay={dropdownMenu("What we do")} trigger={["click"]}>
          <div
            style={{
              cursor: "pointer",
              fontSize: "24px",
              margin: "0 20px",
              padding: "0 20px 0 0",
              fontFamily: "Gotham SSm A, Gotham SSm B",
            }}
          >
            WHAT WE DO <DownOutlined style={{ color: "#7bdcb5" }} />
          </div>
        </Dropdown>
        <Dropdown overlay={dropdownMenu("Who we are")} trigger={["click"]}>
          <div
            style={{
              cursor: "pointer",
              fontSize: "24px",
              margin: "0 20px",
              padding: "0 20px 0 0",
              fontFamily: "Gotham SSm A, Gotham SSm B",
            }}
          >
            WHO WE ARE <DownOutlined style={{ color: "#7bdcb5" }} />
          </div>
        </Dropdown>
        <Dropdown
          overlay={dropdownMenu("Library resource")}
          trigger={["click"]}
        >
          <div
            style={{
              cursor: "pointer",
              fontSize: "24px",
              margin: "0 20px",
              padding: "0 20px 0 0",
              fontFamily: "Gotham SSm A, Gotham SSm B",
            }}
          >
            LIBRARY RESOURCES <DownOutlined style={{ color: "#7bdcb5" }} />
          </div>
        </Dropdown>
      </div>
      <Content>
        <Carousel autoplay>
          {images.map((imageUrl, index) => (
            <div key={index}>
              <img
                src={imageUrl}
                alt={`Slide ${index + 1}`}
                style={ContentStyle}
              />
            </div>
          ))}
        </Carousel>
        <div
          style={{
            backgroundColor: "#daeaef",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <p
              style={{
                color: "#001217",
                fontWeight: "bold",
                fontSize: "30px",
                padding: "50px",
                margin: "50px",
              }}
            >
              The Virtual Mentoring Portals, launched by leading experts in
              mentoring, are safe and monitored mentoring platforms for mentors
              and mentees to build and extend their relationships through online
              communication. Breaking down barriers of distance and
              coordination, the Portals can both supplement in-person
              relationships and facilitate 100% virtual relationships.
            </p>
          </div>
          <div>
            <img
              src="https://www.mentoring.org/wp-content/uploads/2020/05/Virtual-Mentoring-Portals-Logo-05-1024x724.png"
              alt="Virtual Mentoring Portals Logo"
              style={{ width: "450px", height: "300px" }}
            />
          </div>
        </div>
        <div style={{ backgroundColor: "#daeaef", padding: "20px" }}>
          <Divider orientation="left"></Divider>
          <Collapse
            size="large"
            onChange={handlePanelChange}
            activeKey={activePanel}
            style={{ marginTop: "20px" }}
          >
            <Panel
              id="active-panel-1"
              key="1"
              header="1. WHAT IS THE STUDENT VIRTUAL MENTORING PORTAL (SVMP)?"
              style={{
                marginBottom: "20px",
                backgroundColor: "#ffffff",
                fontWeight: "bold",
                fontSize: "24px",
                textAlign: "left",
              }}
              className={activePanel === "1" ? "active-panel" : ""}
            >
              <p
                style={{
                  color: "#000000",
                  textAlign: "left",
                  fontSize: "16px",
                  fontWeight: "normal",
                }}
              >
                The STUDENT Virtual Mentoring Portal (SVMP) is a comprehensive
                platform facilitating structured curriculum, communication
                features, and virtual mentoring opportunities. It ensures
                adherence to best practices, prioritizing safety and data
                privacy. VMP fosters meaningful mentor-mentee relationships
                through its user-friendly interface, offering seamless
                communication channels. With research-backed curriculum and
                robust email and chat functionalities, it empowers users to
                engage in effective mentorship. <br></br>
                The platform's design focuses on accessibility, making it easy
                for users to navigate and utilize its features. VMP serves as a
                reliable resource for both mentors and mentees, enhancing the
                mentoring experience.<br></br>
                It aims to bridge the gap between mentors and mentees, enabling
                them to connect and collaborate effortlessly. By providing a
                secure environment, VMP fosters trust and facilitates valuable
                interactions. Through its innovative approach, VMP
                revolutionizes the landscape of virtual mentoring, making
                mentorship accessible to all.
              </p>
            </Panel>
            <Panel
              key="2"
              header="2. WHAT IS BEING OFFERED?"
              style={{
                marginBottom: "20px",
                backgroundColor: "#ffffff",
                fontWeight: "bold",
                fontSize: "24px",
                textAlign: "left",
              }}
              className={activePanel === "2" ? "active-panel" : ""}
            >
              <p
                style={{
                  color: "#000000",
                  textAlign: "left",
                  fontSize: "16px",
                  fontWeight: "normal",
                }}
              >
                PERSONALISED MENTORSHIP: Connect with experienced mentors who
                are dedicated to guiding and supporting you on your academic and
                professional journey. Whether you're seeking advice on career
                choices, academic goals, or personal development, our mentors
                are here to help. <br></br>
                VIRTUAL MEETINGS: Easily schedule and join virtual meetings with
                your mentors, whether it's a one-on-one session or a group
                discussion. Our platform makes it simple to connect with mentors
                and peers from anywhere in the world, at any time. <br></br>
                ONLINE GROUP CHAT: Engage in dynamic group discussions and
                collaborate with fellow students and mentors in our online chat
                rooms. Share insights, ask questions, and learn from each
                other's experiences in a supportive and collaborative
                environment.<br></br>
                ACCESS RESOURCES: Gain access to our extensive online library,
                curated by SMP mentors, which contains a wealth of resources
                including academic notes, textbooks, presentations, and more.
                Enhance your learning and expand your knowledge with the help of
                our comprehensive resource repository.
              </p>
            </Panel>
            <Panel
              key="3"
              header="3. WHY YOU SHOULD CHOOSE SVMP?"
              style={{
                marginBottom: "20px",
                fontWeight: "bold",
                fontSize: "24px",
                backgroundColor: "#ffffff",
                textAlign: "left",
              }}
              className={activePanel === "3" ? "active-panel" : ""}
            >
              <p
                style={{
                  color: "#000000",
                  textAlign: "left",
                  fontSize: "16px",
                  fontWeight: "normal",
                }}
              >
                CONVENIENCE: Access mentorship and resources anytime, anywhere,
                from any device with an internet connection.<br></br>
                QUALITY: Benefit from the expertise and insights of experienced
                mentors who are passionate about supporting students' success.
                <br></br>
                COMMUNITY: Join a vibrant and supportive community of students
                and mentors who are committed to helping each other grow and
                succeed.<br></br>
                EMPROWERMENT: Take control of your academic and professional
                journey with the guidance and support of mentors who are
                dedicated to helping you succeed.<br></br>
              </p>
            </Panel>
            <Panel
              key="4"
              header="4. WHAT IS OUR MISSION? "
              style={{
                marginBottom: "20px",
                fontWeight: "bold",
                fontSize: "24px",
                backgroundColor: "#ffffff",
                textAlign: "left",
              }}
              className={activePanel === "4" ? "active-panel" : ""}
            >
              <p
                style={{
                  color: "#000000",
                  textAlign: "left",
                  fontSize: "16px",
                  fontWeight: "normal",
                }}
              >
                At SVMP, our mission is to revolutionize the mentoring
                experience by providing unparalleled convenience and
                accessibility. We aim to empower mentors and mentees alike with
                the freedom to schedule meetings at their convenience, ensuring
                that valuable interactions are never missed. With a wealth of
                resources at their fingertips, students can effortlessly access
                the guidance and support they need to thrive academically and
                professionally. Our commitment is to bridge the gap between
                mentors and students, facilitating seamless communication and
                knowledge exchange, ultimately fostering a community where
                learning knows no bounds.
              </p>
            </Panel>
            <Panel
              key="5"
              header="5. DO YOU HAVE PLANS TO ADD A GROUP MENTORING COMPONENT?"
              style={{
                marginBottom: "20px",
                fontWeight: "bold",
                fontSize: "24px",
                backgroundColor: "#ffffff",
                textAlign: "left",
              }}
              className={activePanel === "5" ? "active-panel" : ""}
            >
              <p
                style={{
                  color: "#000000",
                  textAlign: "left",
                  fontSize: "16px",
                  fontWeight: "normal",
                }}
              >
                Absolutely! Group mentoring is an integral part of SVMP's
                approach. Recognizing the value of collaborative learning and
                shared experiences, we have incorporated a robust group
                mentoring component into our platform. This feature enables SVMP
                mentors to engage with their mentees collectively, facilitating
                dynamic discussions, resource sharing, and collaborative
                problem-solving. Through group meetings, chat sessions, and
                curated resources, mentors can effectively support and guide
                their mentees in achieving their academic and professional goals
                within a collaborative learning environment.
              </p>
            </Panel>
          </Collapse>
        </div>

       
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        CreatiO(n) Coders ©{new Date().getFullYear()} Created by the Best
          Developers
      </Footer>
    </Layout>
  );
};

export default YourComponent;
