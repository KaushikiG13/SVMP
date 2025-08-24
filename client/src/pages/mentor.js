import React from "react";
import { useRef } from "react";
import { Breadcrumb, Layout, Menu, theme, Card } from "antd";
import Layouts from "./../components/Layouts";
import menteeImage from "./../resources/mentee-01.png";

export default function Features() {
  const cardsRef = useRef(null);

  const cards = [
    {
      title: "Resource Library",
      description:
        "Access a curated collection of resources, including articles, videos, and guides. Learn new skills and gain insights from expert mentors.",
      imgSrc:
        "https://i.pinimg.com/564x/08/2a/22/082a22dc8f380074179129ccdc43cf79.jpg",
    },
    {
      title: "Mentorship Chats",
      description:
        "Join chat groups to discuss topics, ask questions, and share experiences with mentors and peers.",
      imgSrc:
        "https://i.pinimg.com/564x/5a/79/80/5a7980bc0ed342ca526874450280af94.jpg",
    },
    {
      title: "Career Guidance",
      description:
        "Get personalized advice on your career path. Mentors provide insights into various industries and help you plan your future.",
      imgSrc:
        "https://i.pinimg.com/474x/7d/91/e4/7d91e4aaa1c47516319240194260be6d.jpg",
    },
  ];

  return (
    <Layouts>
      <div
        style={{
          padding: "20px",
          margin: "10px",
          backgroundColor: "#142f44",
        }}
      >
        <img
          src={menteeImage}
          alt="Image"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>

      <div
        style={{
          padding: 24,
          minHeight: 360,
          backgroundColor: "#E1F7F5",
          borderRadius: "16px",
        }}
      >
        <div className="container">
          <div
            ref={cardsRef}
            className="cards-section"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            {cards.map((card, index) => (
              <Card
                key={index}
                hoverable
                style={{
                  width: "200px", // Width of each card
                  margin: "40px", // Margin around each card
                }}
                cover={<img alt={card.title} src={card.imgSrc} />}
              >
                <Card.Meta title={card.title} description={card.description} />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layouts>
  );
}
