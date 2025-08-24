import React from "react";
import Layouts from "./../components/Layouts";
import { Card } from "antd";
import {
  FaCog,
  FaLaptopCode,
  FaMicrochip,
  FaBolt,
  FaCity,
  FaLeaf,
  FaFlask,
  FaIndustry,
} from "react-icons/fa";


import resourceLibraryImage from "../resources/imagee.png";

const ResourceLibrary = () => {
  const departments = [
    {
      name: "Mechanical Engineering",
      icon: <FaCog size={32} style={{ color: "#00A6ED" }} />,
      resources: [
        {
          title: "Thermodynamics",
          link: "https://drive.google.com/drive/folders/1XY5JQvuO3UhlOU0zBgtCNYoj70WW2viH?usp=drive_link",
        },
        {
          title: "Fluid Mechanics",
          link: "https://drive.google.com/drive/folders/1LVEJJiGFXOJXcbcXBrny6rPheHge3icC?usp=drive_link",
        },
        {
          title: "More core Subjects",
          link: "https://drive.google.com/drive/folders/1-MPMrcm5RqqMmliebZ_ZTH_KCoTwYAiA?usp=drive_link",
        },
      ],
    },
    {
      name: "Computer Science & Engineering",
      icon: <FaLaptopCode size={32} style={{ color: "#FF5722" }} />,
      resources: [
        { title: "Data Structures", link: "#" },
        { title: "Algorithms", link: "#" },
        {
          title: "More core Subjects",
          link: "https://drive.google.com/drive/u/1/folders/1MLMiaW0vq0K0lWtUakqLNXjBIfSa9Nw0",
        },
      ],
    },
    {
      name: "Electronics & Communication Engineering",
      icon: <FaMicrochip size={32} style={{ color: "#4CAF50" }} />,
      resources: [
        { title: "Digital Signal Processing", link: "#" },
        { title: "VLSI Design", link: "#" },
        {
          title: "More core Subjects",
          link: "https://drive.google.com/drive/folders/16g1SvodQLuXZknBlNXjVJXmBMUkcmZ8V",
        },
      ],
    },
    {
      name: "Electrical Engineering",
      icon: <FaBolt size={32} style={{ color: "#FFC107" }} />,
      resources: [
        { title: "Power Systems", link: "#" },
        { title: "Control Systems", link: "#" },
        {
          title: "More core Subjects",
          link: "https://drive.google.com/drive/u/4/folders/1qI6i_v7dTvWirq8syp60VAo750c-xXlH",
        },
      ],
    },
    {
      name: "Civil Engineering",
      icon: <FaCity size={32} style={{ color: "#795548" }} />,
      resources: [
        { title: "Structural Analysis", link: "#" },
        { title: "Transportation Engineering", link: "#" },
        {
          title: "More core Subjects",
          link: "https://drive.google.com/drive/folders/1Ly4pGcHli_UU1XmLgtbT6qE_EV43LYjY",
        },
      ],
    },
    {
      name: "Biotechnology",
      icon: <FaLeaf size={32} style={{ color: "#9C27B0" }} />,
      resources: [
        { title: "Genetics", link: "#" },
        { title: "Molecular Biology", link: "#" },
        {
          title: "More core Subjects",
          link: "https://drive.google.com/drive/u/3/folders/10Gl296BcmzT2v8oaKSQQsBthFT8USjex",
        },
      ],
    },
    {
      name: "Chemical Engineering",
      icon: <FaFlask size={32} style={{ color: "#3F51B5" }} />,
      resources: [
        { title: "Process Engineering", link: "#" },
        { title: "Chemical Reaction Engineering", link: "#" },
        {
          title: "More core Subjects",
          link: "https://drive.google.com/drive/folders/1LS5fXhC0G5ykhd8-yl_WD4Cjj-mC6VzT",
        },
      ],
    },
    {
      name: "Production Engineering",
      icon: <FaIndustry size={32} style={{ color: "#FFB300" }} />,
      resources: [
        { title: "Production Planning", link: "#" },
        { title: "Quality Control", link: "#" },
        {
          title: "More core Subjects",
          link: "https://drive.google.com/drive/folders/1THq-Nv3vxPxsDle_HhvKeEBmroz8LWDi",
        },
      ],
    },
  ];

  return (
    <Layouts>
      <div style={{ padding: "20px" }}>
        {/* Add the local image just above the cards */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src={resourceLibraryImage} // Use the imported image as the source
            alt="Resource Library"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "10px",
            }}
          />
        </div>

        {/* Cards section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {departments.map((department) => (
            <Card
              key={department.name}
              style={{
                borderRadius: "10px",
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div style={{ marginRight: "10px" }}>{department.icon}</div>
                <h3 style={{ margin: 0 }}>{department.name}</h3>
              </div>
              <ul style={{ padding: 0, listStyle: "none" }}>
                {department.resources.map((resource, index) => (
                  <li key={index} style={{ marginBottom: "8px" }}>
                    <a
                      href={resource.link}
                      style={{ color: "#1890FF", textDecoration: "none" }}
                    >
                      {resource.title}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </Layouts>
  );
};

export default ResourceLibrary;
