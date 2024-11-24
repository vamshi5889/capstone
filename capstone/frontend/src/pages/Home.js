import React, { useState } from "react";
import { Button, Typography, Row, Col, Divider, Input } from "antd";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
const { Search } = Input;

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    navigate(`/projects?search=${searchQuery}`);
  };

  return (
    <div className="home-layout">
      <Row align={"center"}>
        <Divider
          style={{
            borderColor: "#faad14",
          }}
        >
          <Title
            level={3}
            style={{ color: "#faad14", textTransform: "uppercase" }}
          >
            Welcome to the Capstone Portfolio
          </Title>
        </Divider>
      </Row>
      <Row align={"center"} style={{ margin: "10px 10%" }}>
        <Title level={5} style={{ color: "#000", textAlign: "center" }}>
          Browse, upload, and discover capstone projects from students and
          faculty.
        </Title>
      </Row>
      <Row align={"center"} style={{ margin: "10px 10%" }}>
        <Title level={5} style={{ color: "#000", textAlign: "center" }}>
          <b>Student Portfolio Projects: </b> UMBC graduate Program students
          work 1-on-1 with their instructors to design and create a capstone
          project at the end of their programs.
        </Title>
      </Row>
      <Row align={"center"} style={{ margin: "10px 10%" }}>
        <Title level={5} style={{ color: "#000", textAlign: "center" }}>
          Through this project, students are able to implement and showcase the
          software skills they learned during their training. Once completed,
          capstone projects serve as portfolio pieces that students can feel
          proud to call their own and utilize at job interviews to demonstrate
          their real-world knowledge and abilities.
        </Title>
      </Row>
      <Row align={"center"} style={{ margin: "10px 10%" }}>
        <Col span={10}>
          <Button
            type="primary"
            style={{ width: "200px" }}
            className="logout-btn btn-font"
            onClick={() => navigate("/projects")}
          >
            Explore All Projects
          </Button>
        </Col>
        <Col span={10} className="search-btn">
          <form onSubmit={handleSearch}>
            <Search
              placeholder="Search projects..."
              allowClear
              onSearch={handleSearch}
              onChange={(e) => setSearchQuery(e.target.value)}
              enterButton
              value={searchQuery}
            />
          </form>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
