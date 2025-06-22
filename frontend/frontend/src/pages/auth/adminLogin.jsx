import { Button, Form, Input, Card, Typography, message } from "antd";
import bgImage from "../../images/bg.png";
import { useNavigate } from "react-router-dom";
import axios from "../../api/api";

const { Title } = Typography;

const AdminLogin = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      console.log("Sending login request with:", values);
      const response = await axios.post("/api/superadmin/auth/login", values, {
        withCredentials: true,
      });

      console.log("Login response:", response.data);
      if (response.data.success) {
        localStorage.setItem("superadminToken", response.data.token);
        message.success("Login successful!");
        console.log("Attempting to navigate to /superadmin/dashboard");
        navigate("/superadmin/dashboard", { replace: true });
      } else {
        message.error("Login failed: Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      if (error.response?.status === 403) {
        message.error("Access forbidden: Check server configuration or credentials");
      } else if (error.response?.status === 401) {
        message.error("Invalid username or password");
      } else {
        message.error("Network error or server unavailable. Please try again.");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form validation failed:", errorInfo);
    message.error("Please check your credentials");
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <Card
          hoverable
          style={{
            width: "100%",
            maxWidth: 480,
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "none",
            overflow: "hidden",
          }}
          bodyStyle={{ padding: "40px" }}
        >
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <Title level={3} style={{ color: "#7d8ff5", marginBottom: "8px" }}>
              Superadmin Login
            </Title>
            <p style={{ color: "#666" }}>Sign in to your superadmin account</p>
          </div>

          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please input your username!" }]}
              labelCol={{ style: { fontWeight: 500 } }}
            >
              <Input
                size="large"
                placeholder="Enter your username"
                style={{ borderRadius: "6px" }}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
              labelCol={{ style: { fontWeight: 500 } }}
            >
              <Input.Password
                size="large"
                placeholder="Enter your password"
                style={{ borderRadius: "6px" }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                style={{
                  height: "48px",
                  borderRadius: "6px",
                  fontWeight: 500,
                  fontSize: "16px",
                  backgroundColor: "#7d8ff5",
                  color: "white",
                }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;