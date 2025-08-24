import React from "react";
import teammate1 from "./../resources/aman.jpg"; // Import the images for each teammate
import teammate2 from "./../resources/image.jpeg";
import teammate3 from "./../resources/Gaurav.jpeg";
import teammate4 from "./../resources/vatsal.jpeg";


const AboutUs = () => {
  return (
    <div>
      <div
        style={{
          backgroundColor: "#132f45",
          color: "#ffffff",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1>About Us</h1>
      </div>
      <div style={{ padding: "20px",backgroundColor:"#ffffff" }}>
        <h2 style={{ color: "#132f45",textAlign:"center" }}>Team Members</h2>
        <div style={{ display: "flex", justifyContent: "space-around",padding:"30px" }}>
          <div style={{ textAlign: "center" ,fontWeight:'bold'}}>
            <img
              src={teammate1}
              alt="Teammate 1"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                marginBottom: "10px",
              }}
            />
            <p>Amandeep Singh</p>
          </div>
          <div style={{ textAlign: "center",fontWeight:'bold' }}>
            <img
              src={teammate2}
              alt="Teammate 2"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                marginBottom: "10px",
              }}
            />
            <p>Aradhya Singh</p>
          </div>
          <div style={{ textAlign: "center",fontWeight:'bold' }}>
            <img
              src={teammate3}
              alt="Teammate 3"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                marginBottom: "10px",
              }}
            />
            <p>Gaurav Sharma</p>
          </div>
          <div style={{ textAlign: "center",fontWeight:'bold' }}>
            <img
              src={teammate4}
              alt="Teammate 4"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                marginBottom: "10px",
              }}
            />
            <p>Vatsal Devra</p>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#daeaef",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#000000" }}>
          The Student Virtual Mentorship Portal (SVMP) is a groundbreaking
          initiative aimed at revolutionizing mentorship in the digital age. Our
          platform connects mentors and mentees from various backgrounds and
          disciplines, providing them with a safe and accessible space to engage
          in meaningful mentorship relationships.
        </p>
      </div>
      <footer
        style={{
          textAlign: "center",
          backgroundColor: "#132f45",
          color: "#ffffff",
          padding: "20px",
        }}
      >
        CreatiO(n) Coders ©{new Date().getFullYear()} Created by the Best
        Developers
      </footer>
    </div>
  );
};

export default AboutUs;
