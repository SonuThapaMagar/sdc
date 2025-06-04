import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import img from "../../images/login.png";
import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import api from "../../api/api"; // Import the Axios instance

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setUserId("");

    console.log("Login form submitted with data:", formData);

    try {
      const response = await api.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const data = response.data;
      setSuccess(data.message || "Login successful!");
      setUserId(data.id || "");
      console.log("User ID (UUID):", data.id);

      // Store the JWT token and userId in localStorage
      if (data.token) {
        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("userId", data.id);
      }

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An error occurred during login";
      setError(errorMessage);
      console.error("Error:", errorMessage);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <main className="main-content">
        <div className="illustration-container">
          <img
            src={img}
            alt="Pet care illustration"
            className="pet-illustration"
          />
        </div>
        <div className="form-container">
          <div className="form-card">
            <h4 className="title">FurEverHome</h4>
            <h2 className="form-title">Login</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && (
              <p className="text-green-500 text-center mb-4">{success}</p>
            )}
            {userId && (
              <p className="text-blue-500 text-center mb-4">
                Your User ID: {userId}
              </p>
            )}
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password*</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Your Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="forgot-password">
                <Link to="/forgot-password">Forget Password</Link>
              </div>
              <button type="submit" className="submit-button">
                Sign in
              </button>
            </form>
            <div className="form-footer">
              <p>
                Don't have Account?{" "}
                <Link to="/signup" className="form-link">
                  Sign up Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
