import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import img from "../../images/login.png";
import { useState } from "react";

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
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const rawResponse = await response.text();
        console.log("Raw server response:", rawResponse);
        let errorMessage;
        if (rawResponse) {
          try {
            const errorData = JSON.parse(rawResponse);
            errorMessage =
              errorData.message ||
              `Login failed: ${response.status} ${response.statusText}`;
          } catch (jsonError) {
            console.error("Failed to parse JSON response:", jsonError);
            errorMessage = `Login failed: ${response.status} ${response.statusText}`;
          }
        } else {
          errorMessage = `Login failed: ${response.status} ${response.statusText}`;
        }
        setError(errorMessage);
        console.error("Login failed:", errorMessage);
        return;
      }

      const data = await response.json();
      setSuccess(data.message || "Login successful!");
      setUserId(data.userId || "");
      console.log("User ID (UUID):", data.userId);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setError(error.message || "An error occurred during login");
      console.error("Error:", error);
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
            <form className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Your Email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password*</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Your Password"
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
