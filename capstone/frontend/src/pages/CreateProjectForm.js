import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Row, Col, Input, Select, Upload, Button } from "antd";
import Title from "antd/es/typography/Title";

function CreateProjectForm({
  formData,
  setFormData,
  userList,
  mode,
  departments,
}) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <Row className="mb-4">
        <Col span={24} className="mb-4">
          <label className="block mb-2">Title:</label>
          <Input
            placeholder="Enter Title"
            value={formData.title}
            onChange={handleChange}
            name="title"
            maxLength={200}
          />
        </Col>
        <Col span={24} className="mb-4">
          <label className="block mb-2">Abstract:</label>
          <Input.TextArea
            placeholder="Enter Description"
            value={formData.abstract}
            onChange={handleChange}
            name="abstract"
            maxLength={1000000}
          />
        </Col>
        <Col span={24} className="mb-4">
          <label className="block mb-2">Team Members:</label>
          <Input
            placeholder="Enter Title"
            value={formData.team_members}
            onChange={handleChange}
            name="team_members"
            maxLength={200}
          />
        </Col>
        <Col span={12} className="mb-4">
          <label className="block mb-2">Created By:</label>
          <Select
            value={formData?.created_by}
            style={{ width: "98%" }}
            allowClear
            options={userList?.map(({ id, name, department }) => {
              return { value: id, label: name + " - " + department };
            })}
            name="created_by"
            onChange={(e) => setFormData({ ...formData, created_by: e })}
            placeholder="Select User"
          />
        </Col>
        <Col span={12} className="mb-4">
          <label className="block mb-2">Department:</label>
          <Select
            value={formData?.department}
            style={{ width: "98%" }}
            allowClear
            options={departments?.map(({ id, name }) => {
              return { value: id, label: name };
            })}
            name="department"
            onChange={(e) => setFormData({ ...formData, department: e })}
            placeholder="Select Department"
          />
        </Col>
        <Col span={24} className="mb-4">
          <label className="block mb-2">Project File:</label>
          <Upload
            value={formData.file}
            maxCount={1}
            multiple={false}
            onChange={(e) => {
              setFormData({ ...formData, file: e.file });
            }}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
          {mode === "edit" && formData.file && (
            <a
              target="_blank"
              href={`http://127.0.0.1:5000${formData.file.file_path}`}
            >
              <Title level={5}>{formData.file.file_name}</Title>
            </a>
          )}
        </Col>
      </Row>
    </form>
  );
}

export default CreateProjectForm;
