import { Link, useNavigate } from "react-router-dom";
import "../../styles/signup.css";
import img2 from "../../images/login.png";
import { useState } from "react";

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
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        // Log the raw response for debugging
        const rawResponse = await response.text();
        console.log("Raw server response:", rawResponse);

        // Attempt to parse JSON, but handle failure gracefully
        let errorData;
        try {
          errorData = JSON.parse(rawResponse);
        } catch (jsonError) {
          console.error("Failed to parse JSON response:", jsonError);
          throw new Error(`Signup failed: ${response.status} ${response.statusText}`);
        }

        const errorMessage = errorData.message || `Signup failed: ${response.status} ${response.statusText}`;
        setError(errorMessage);
        console.error("Signup failed:", errorMessage);
        return;
      }

      const data = await response.json();
      setSuccess(data.message || "Signup successful!");
      setUserId(data.userId || "");
      console.log("User ID (UUID):", data.userId);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setError(error.message || "An error occurred during signup");
      console.error("Error:", error);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
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