import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Row,
  Col,
} from "antd";
import {
  ArrowLeftOutlined
} from "@ant-design/icons";
const { Title } = Typography;

function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate()
  const [project, setProject] = useState({
    abstract: "Real Time Analysis of Live Data",
    created_by: {
      email: "alice.admin@example.com",
      name: "Alice Admin",
    },
    department: "Computer Science",
    id: 1,
    media_files: [
      {
        file_name: "report.pdf",
        file_path: "/files/project_a/report.pdf",
      },
    ],
    team_members: ["John", "Jane"],
    title: "Real Time Analysis ",
  });

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/project/${projectId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch project details");
        }

        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  return (
    <div className="users-list-layout">
      <Row>
        <Col span={12}>
          <Title level={2}>Projects Details</Title>
        </Col>
        <Col span={12} style={{textAlign: "right", cursor: "pointer"}}>
          <Title level={5} style={{color: "#faad14"}} onClick={() => navigate(-1)}><ArrowLeftOutlined className="pr-1"/>Go Back</Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Title level={3}>{project.title}</Title>
        </Col>
        <Col span={24}>
          <Title level={5}>
            <b>Abstract: </b>
            {project.abstract}
          </Title>
        </Col>
        <Col span={24}>
          <Title level={5}>
            <b>Team Members: </b>
            {project.team_members.join(", ")}
          </Title>
        </Col>
        <Col span={24}>
          <Title level={5}>
            <b>Department: </b>
            {project.department}
          </Title>
        </Col>
        <Col span={24}>
          <Title level={5}>
            <b>Created By: </b>
            {project.created_by.name}
          </Title>
        </Col>
        <Col span={24}>
          <Title level={5}>
            <b>Media Files: </b>
            {project.media_files.map((file) => (
              <a href={`http://127.0.0.1:5000/${file.file_path}`} download>
                {file.file_name}
              </a>
            ))}
          </Title>
        </Col>
      </Row>
    </div>
  );
}

export default ProjectDetails;
