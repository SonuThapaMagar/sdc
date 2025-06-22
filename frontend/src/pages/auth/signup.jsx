"use client"

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "../users/Navbar"
import api from "../../api/api"
import "../../styles/signup.css"
import img2 from "../../images/login.png"

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [userId, setUserId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setUserId("")
    setIsLoading(true)

    console.log("Form submitted with data:", formData)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      console.error("Error: Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const response = await api.post("/api/auth/signup", {
        fullName: formData.fullName,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      })

      const data = response.data
      setSuccess(data.message || "Signup successful!")
      setUserId(data.id || "")
      console.log("User ID (UUID):", data.id)
      setTimeout(() => navigate("/login"), 2000)
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred during signup"
      setError(errorMessage)
      console.error("Error:", errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const illustrationVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  }

  const inputVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  }

  const messageVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.9,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <motion.div className="page-container" variants={containerVariants} initial="hidden" animate="visible">
      <Navbar />
      <main className="main-content">
        <motion.div className="illustration-container" variants={illustrationVariants}>
          <motion.img
            src={img2}
            alt="Pet care illustration"
            className="pet-illustration"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        <motion.div className="form-container" variants={formVariants}>
          <motion.div className="form-card" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
            <motion.h2 className="form-title" variants={itemVariants}>
              Sign up
            </motion.h2>

            {error && (
              <motion.p
                className="text-red-500 text-center mb-4"
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {error}
              </motion.p>
            )}

            {success && (
              <motion.p
                className="text-green-500 text-center mb-4"
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {success}
              </motion.p>
            )}

            {userId && (
              <motion.p
                className="text-blue-500 text-center mb-4"
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                Your User ID: {userId}
              </motion.p>
            )}

            <motion.form className="signup-form" onSubmit={handleSubmit} variants={containerVariants}>
              <motion.div className="form-row" variants={inputVariants}>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name*</label>
                  <motion.input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter Your Full Name"
                    required
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)",
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address*</label>
                  <motion.input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter Your Address"
                    required
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)",
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </motion.div>

              <motion.div className="form-row" variants={inputVariants}>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number*</label>
                  <motion.input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter Your Phone Number"
                    required
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)",
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email*</label>
                  <motion.input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email"
                    required
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)",
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </motion.div>

              <motion.div className="form-row" variants={inputVariants}>
                <div className="form-group">
                  <label htmlFor="password">Password*</label>
                  <motion.input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Your Password"
                    required
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)",
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password*</label>
                  <motion.input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Enter Your Confirm Password"
                    required
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)",
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </motion.div>

              <motion.button
                type="submit"
                className="submit-button"
                variants={inputVariants}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#7c3aed",
                }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
                animate={isLoading ? { scale: [1, 1.02, 1] } : {}}
                transition={{
                  duration: isLoading ? 1 : 0.2,
                  repeat: isLoading ? Number.POSITIVE_INFINITY : 0,
                }}
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </motion.button>
            </motion.form>

            <motion.div className="form-footer" variants={itemVariants}>
              <p>
                Already Have an Account?{" "}
                <Link to="/login" className="form-link">
                  Sign in Here
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  )
}

export default Signup
