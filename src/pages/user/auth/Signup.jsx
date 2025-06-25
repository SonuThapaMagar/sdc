import { Link, useNavigate } from "react-router-dom";
import "../../../styles/signup.css";
import img2 from "../../../images/login.png";
import { useState } from "react";
import api from "../../../api/api";
import '../../../styles/global.css';


function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    console.log("Form submitted with data:", formData);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      console.error("Error: Passwords do not match");
      return;
    }

    try {
      const response = await api.post("/api/auth/signup", {
        fullName: formData.fullName,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      });

      const data = response.data;
      setSuccess(data.message || "Signup successful!");
      setUserId(data.id || "");
      console.log("User ID (UUID):", data.id);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An error occurred during signup";
      setError(errorMessage);
      console.error("Error:", errorMessage);
    }
  };

  return (
    <div className="page-container">
      <main className="main-content">
        <div className="illustration-container">
          <img
            src={img2}
            alt="Pet care illustration"
            className="pet-illustration"
          />
        </div>
        <div className="form-container">
          <div className="form-card">
            <h2 className="form-title">Sign up</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && (
              <p className="text-green-500 text-center mb-4">{success}</p>
            )}
            {userId && (
              <p className="text-blue-500 text-center mb-4">
                Your User ID: {userId}
              </p>
            )}
            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name*</label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter Your Full Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address*</label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter Your Address"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number*</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter Your Phone Number"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password*</label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Your Password"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password*</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Enter Your Confirm Password"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="submit-button">
                Sign Up
              </button>
            </form>
            <div className="form-footer">
              <p>
                Already Have an Account?{" "}
                <Link to="/login" className="form-link">
                  Sign in Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Signup;
