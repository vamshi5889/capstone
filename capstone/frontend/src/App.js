import React, { useState, useEffect } from "react";
import HeaderComponent from "./components/Header";
import FooterComponent from "./components/Footer";
import "./index.css";
import Navigation from "./components/Navigation";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Radio } from "antd";
const { Header, Content, Footer } = Layout;

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("name") !== "" && localStorage.getItem("name") !== null
  );
  const [mode, setMode] = useState(
    location.pathname.includes("/user") ? "users" : "projects"
  );

  useEffect(() => {
    setMode(location.pathname.includes("/user") ? "users" : "projects")
  },[location])

  const handleModeChange = (e) => {
    setMode(e.target.value);
    navigate(`/${e.target.value}`);
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/auth_status", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.authenticated);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <Layout>
      <Header className="header-layout">
        <HeaderComponent
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      </Header>
      <Layout>
        <Content>
          {isAuthenticated &&
            (location.pathname.includes("/user") ||
              location.pathname.includes("/project")) && (
              <Radio.Group
                className="dashboard-tabs"
                onChange={handleModeChange}
                value={mode}
                style={{ padding: "2% 10%" }}
              >
                {/* {localStorage.getItem("role") === "Admin" && ( */}
                  <Radio.Button value="users" className="dashboard-tabs">
                    Users
                  </Radio.Button>
                {/* )} */}
                <Radio.Button value="projects" className="dashboard-tabs">
                  Projects
                </Radio.Button>
              </Radio.Group>
            )}
          <Navigation isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}/>
        </Content>
      </Layout>
      <Footer className="footer-layout">
        <FooterComponent />
      </Footer>
    </Layout>
  );
}

export default App;
