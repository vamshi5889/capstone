import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { Col, Row, Button, Typography, Space } from "antd";
import {
  LoginOutlined,
  LogoutOutlined,
  HomeOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
const { Title } = Typography;

function Header({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setIsAuthenticated(false);
      navigate("/login");
    }

    setIsAuthenticated(false);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Row className="header-container">
      <Col span={12}>
        <Link to="/home">
          <img
            src={logo}
            alt="Capstone Portfolio Logo"
            className="h-12 w-auto"
          />
        </Link>
      </Col>
      <Col span={12}>
        <Row>
          <Col
            span={5}
            className={`nav-text-alignment ${
              location.pathname === "/home" ? "header-nav-active" : ""
            }`}
          >
            <Link to="/home" className="header-nav-text">
              <HomeOutlined className="header-icons" />
              Home
            </Link>
          </Col>
          <Col
            span={5}
            className={`nav-text-alignment ${
              location.pathname === "/projects" ? "header-nav-active" : ""
            }`}
          >
            <Link to="/projects" className="header-nav-text">
              <ProjectOutlined className="header-icons" />
              Projects
            </Link>
          </Col>
          <Col
            span={14}
            className="logout-btn-alignment"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: isAuthenticated ? "center" : "flex-end",
            }}
          >
            {isAuthenticated ? (
              <Row align="center">
                <Col
                  span={16}
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                  }}
                >
                  <Title level={4} style={{ marginBottom: "0px" }}>
                    Hi! {localStorage.getItem("name")}
                  </Title>
                </Col>
                <Col span={1}>{"       "}</Col>
                <Col span={6} style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    type="primary"
                    icon={<LogoutOutlined />}
                    onClick={() => handleLogout()}
                    iconPosition={"start"}
                    className="logout-btn"
                  >
                    Logout
                  </Button>
                </Col>
              </Row>
            ) : (
              <Button
                type="primary"
                icon={<LoginOutlined />}
                onClick={() => navigate("/login")}
                iconPosition={"end"}
                className="logout-btn"
              >
                Login
              </Button>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Header;
