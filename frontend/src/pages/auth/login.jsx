"use client"

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "../users/Navbar"
import api from "../../api/api"
import "../../styles/login.css"
import img from "../../images/login.png"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    console.log("Login form submitted with data:", formData)

    try {
      const response = await api.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      })

      const data = response.data
      setSuccess(data.message || "Login successful!")
      setUserId(data.id || "")
      console.log("User ID (UUID):", data.id)

      // Store the JWT token and userId in localStorage
      if (data.token) {
        localStorage.setItem("jwtToken", data.token)
        localStorage.setItem("userId", data.id)
      }

      setTimeout(() => navigate("/dashboard"), 2000)
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred during login"
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
        staggerChildren: 0.2,
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
            src={img}
            alt="Pet care illustration"
            className="pet-illustration"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        <motion.div className="form-container" variants={formVariants}>
          <motion.div className="form-card" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
            <motion.h2 className="form-title" variants={itemVariants}>
              Login
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

            <motion.form className="login-form" onSubmit={handleSubmit} variants={containerVariants}>
              <motion.div className="form-group" variants={inputVariants}>
                <label htmlFor="email">Email*</label>
                <motion.input
                  type="email"
                  id="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)",
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              <motion.div className="form-group" variants={inputVariants}>
                <label htmlFor="password">Password*</label>
                <motion.input
                  type="password"
                  id="password"
                  placeholder="Enter Your Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)",
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              <motion.div className="forgot-password" variants={inputVariants}>
                <Link to="/forgot-password">Forget Password</Link>
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
                {isLoading ? "Signing in..." : "Sign in"}
              </motion.button>
            </motion.form>

            <motion.div className="form-footer" variants={itemVariants}>
              <p>
                Don't have Account?{" "}
                <Link to="/signup" className="form-link">
                  Sign up Here
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  )
}

export default Login
