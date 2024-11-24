import React, { useState, useEffect } from "react";
import {
  Button,
  message,
  Table,
  Typography,
  Row,
  Col,
  Popconfirm,
  Modal,
  Spin,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UsergroupAddOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import CreateUserForm from "./CreateUserForm";
const { Title } = Typography;

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [mode, setMode] = useState("create");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    department: "",
  });
  const [showLoader, setShowLoader] = useState(false);

  const fetchDepartments = async () => {
    setShowLoader(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/departments");
      const data = await response.json();
      setDepartmentsList(data);
      if (data.length > 0) {
        setFormData({ ...formData, department: data[0].id });
      }
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      message.error("Error while fetching the departments");
      console.error("Failed to load departments:", error);
    }
    setOpenModal(true);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
      department: "",
    });
    setSelectedRecord(null);
  };

  const showModal = () => {
    setMode("create");
    fetchDepartments();
  };

  const handleOk = async () => {
    setShowLoader(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "",
          department: "",
        });
        setOpenModal(false);
        setSelectedRecord(null);
        setShowLoader(false);
        message.success("User Created Successfully");
      } else {
        setShowLoader(false);
        message.error("Error while creating the user");
      }
    } catch (error) {
      setShowLoader(false);
      console.error("Error creating user:", error);
    }
  };

  const handleSubmit = async () => {
    setShowLoader(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/user/${selectedRecord.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "",
          department: "",
        });
        setOpenModal(false);
        setSelectedRecord(null);
        setShowLoader(false);
        message.success("User Created Successfully");
      } else {
        setShowLoader(false);
        message.error("Error while creating the user");
      }
    } catch (error) {
      setShowLoader(false);
      console.error("Error creating user:", error);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
    setSelectedRecord(null);
  };

  const confirm = async () => {
    setOpen(false);
    setShowLoader(true);
    try {
      const response = await fetch(
        `http://3.140.201.141:5000/api/user/${selectedRecord.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      setShowLoader(false);
      message.success("User Deleted Successfully");
    } catch (error) {
      setShowLoader(false);
      message.error("Error while deleting the user");
    }
    setSelectedRecord(null);
  };

  const cancel = () => {
    setOpen(false);
    setSelectedRecord(null);
  };

  const handleOpenChange = (newOpen, record) => {
    setOpen(newOpen);
    setSelectedRecord(!newOpen ? null : record);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name > b.name,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      sorter: (a, b) => a.role > b.role,
      filterMode: "tree",
      filterSearch: true,
      filters: [
        ...new Map(
          users
            ?.map(({ role }) => {
              return { value: role, text: role };
            })
            ?.map((item) => [item["text"], item])
        ).values(),
      ],
      onFilter: (value, record) => record.role.startsWith(value),
    },
    {
      title: "Department",
      dataIndex: "department",
      sorter: (a, b) => a.department > b.department,
      filterMode: "tree",
      filterSearch: true,
      filters: [
        ...new Map(
          users
            ?.map(({ department }) => {
              return { value: department, text: department };
            })
            ?.map((item) => [item["text"], item])
        ).values(),
      ],
      onFilter: (value, record) => record.department.startsWith(value),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record, index) => (
        <>
          <EditOutlined
            onClick={async () => {
              await fetchDepartments();
              setFormData({
                name: record.name,
                email: record.email,
                role: record.role,
                password: record.password,
                department: record.department,
              });
              setSelectedRecord(record);
              setOpenModal(true);
              setMode("edit");
            }}
            className="action-pointers"
          />
          <Popconfirm
            title="Delete the user"
            open={open && selectedRecord?.id === record.id}
            onOpenChange={(newOpen) => handleOpenChange(newOpen, record)}
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            description="Are you sure to delete this user?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <DeleteOutlined className="action-pointers" />
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://3.140.201.141:5000/api/users", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {}
    };
    setUsers([
      {
        id: 7,
        name: "Admin",
        email: "admin@example.com",
        role: "Admin",
        department: "Computer Science",
      },
      {
        id: 1,
        name: "Alice Admin",
        email: "alice.admin@example.com",
        role: "Admin",
        department: "Computer Science",
      },
      {
        id: 2,
        name: "Bob Teacher",
        email: "bob.teacher@example.com",
        role: "Teacher",
        department: "Computer Science",
      },
      {
        id: 3,
        name: "Charlie Student",
        email: "charlie.student@example.com",
        role: "Student",
        department: "Computer Science",
      },
      {
        id: 8,
        name: "Shreya",
        email: "shreya@umbc.com",
        role: "Student",
        department: "Electonics",
      },
      {
        id: 9,
        name: "Mani",
        email: "manitest@gmail.com",
        role: "Student",
        department: "Electonics",
      },
      {
        id: 10,
        name: "Sai Kumar",
        email: "sai@gmail.com",
        role: "Student",
        department: "Electonics",
      },
      {
        id: 12,
        name: "Ece",
        email: "ece@ece.com",
        role: "Student",
        department: "Computer Science",
      },
    ]);
    fetchUsers();
  }, []);

  return (
    <div className="users-list-layout">
      <Spin spinning={showLoader} size="large" fullscreen />
      <Row>
        <Col span={12}>
          <Title level={2}>Users</Title>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          {localStorage.getItem("role") === "Admin" && (
            <Button
              type="primary"
              icon={<UsergroupAddOutlined />}
              iconPosition={"start"}
              className="logout-btn"
              onClick={showModal}
            >
              Create User
            </Button>
          )}
        </Col>
      </Row>
      <Table columns={columns} dataSource={users} />
      <Modal
        open={openModal}
        title={
          <Title level={2}>
            {mode === "edit" ? "Edit User" : "Create New User"}
          </Title>
        }
        onCancel={handleCancel}
        okText={"Create"}
        width="60%"
        maskClosable={false}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <Button
              type="primary"
              className="logout-btn"
              onClick={mode === "edit" ? handleSubmit : handleOk}
            >
              Save
            </Button>
          </>
        )}
      >
        <CreateUserForm
          formData={formData}
          setFormData={setFormData}
          departmentsList={departmentsList}
        />
      </Modal>
    </div>
  );
}

export default AllUsers;
