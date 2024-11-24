import React from "react";
import {
  Row,
  Col,
  Input,
  Select,
} from "antd";

function CreateUserForm({ formData, setFormData, departmentsList }) {

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <Row className="mb-4">
        <Col span={24} className="mb-4">
          <label className="block mb-2 font-bold">
            Name:
          </label>
          <Input
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            name="name"
            maxLength={30}
          />
        </Col>
        <Col span={24} className="mb-4">
          <label className="block mb-2 font-bold">
            Email:
          </label>
          <Input
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            maxLength={30}
          />
        </Col>
        <Col span={24} className="mb-4">
          <label className="block mb-2 font-bold">
            Password:
          </label>
          <Input.Password
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            maxLength={30}
          />
        </Col>
        <Col span={12} className="mb-4">
          <label className="block mb-2 font-bold">Role:</label>
          <Select
            value={formData.role}
            style={{ width: "98%" }}
            allowClear
            options={[
              { value: "Student", label: "Student" },
              { value: "Faculty", label: "Faculty" },
              { value: "Admin", label: "Admin" },
            ]}
            name="role"
            onChange={(e) => setFormData({ ...formData, role: e })}
            placeholder="Select Department"
          />
        </Col>
        <Col span={12} className="mb-4">
          <label className="block mb-2 font-bold">Department:</label>
          <Select
            value={formData.department}
            style={{ width: "98%" }}
            allowClear
            options={departmentsList?.map(({ id, name }) => {
              return { value: id, label: name };
            })}
            name="role"
            onChange={(e) => setFormData({ ...formData, department: e })}
            placeholder="Select Department"
          />
        </Col>
      </Row>
    </form>
  );
}

export default CreateUserForm;
