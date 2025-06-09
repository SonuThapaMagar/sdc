
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Camera, User, Mail, Calendar, Shield, Edit2, Save } from "lucide-react"
import "../../styles/ProfileModal.css"

const ProfileModal = ({ isOpen, onClose, userProfile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: userProfile?.fullName || "Stylish Boi",
    email: userProfile?.email || "stylishboi@gmail.com",
    profileImage: userProfile?.profileImage || null,
    memberSince: userProfile?.memberSince || "January 2024",
    accountStatus: userProfile?.accountStatus || "Active",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    // Full Name validation
    if (!profileData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    } else if (profileData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters"
    } else if (profileData.fullName.trim().length > 50) {
      newErrors.fullName = "Full name must be less than 50 characters"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!profileData.email.trim()) {
      newErrors.email = "Email address is required"
    } else if (!emailRegex.test(profileData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          profileImage: "Please select a valid image file",
        }))
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          profileImage: "Image size must be less than 5MB",
        }))
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData((prev) => ({
          ...prev,
          profileImage: e.target.result,
        }))
        setErrors((prev) => ({
          ...prev,
          profileImage: "",
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onUpdateProfile(profileData)
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setProfileData({
      fullName: userProfile?.fullName || "Stylish Boi",
      email: userProfile?.email || "stylishboi@gmail.com",
      profileImage: userProfile?.profileImage || null,
      memberSince: userProfile?.memberSince || "January 2024",
      accountStatus: userProfile?.accountStatus || "Active",
    })
    setErrors({})
    setIsEditing(false)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="profile-modal-overlay"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="profile-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <motion.div
            className="profile-header"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="profile-title-section">
              <h1 className="profile-title">Profile</h1>
              <p className="profile-subtitle">Your profile information</p>
            </div>
            <div className="profile-header-actions">
              {!isEditing ? (
                <motion.button
                  className="edit-button"
                  onClick={() => setIsEditing(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit2 size={18} />
                  Edit
                </motion.button>
              ) : (
                <div className="edit-actions">
                  <motion.button
                    className="cancel-button"
                    onClick={handleCancel}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    className="save-button"
                    onClick={handleSave}
                    disabled={isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLoading ? (
                      <div className="loading-spinner" />
                    ) : (
                      <>
                        <Save size={18} />
                        Save
                      </>
                    )}
                  </motion.button>
                </div>
              )}
              <motion.button
                className="close-button"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="profile-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Profile Image Section */}
            <motion.div
              className="profile-image-section"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="profile-image-container">
                <div className="profile-image-wrapper">
                  {profileData.profileImage ? (
                    <img src={profileData.profileImage || "/placeholder.svg"} alt="Profile" className="profile-image" />
                  ) : (
                    <div className="profile-image-placeholder">
                      <User size={40} />
                    </div>
                  )}
                  {isEditing && (
                    <motion.label
                      className="camera-button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Camera size={16} />
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />
                    </motion.label>
                  )}
                </div>
              </div>
              <p className="profile-image-hint">
                {isEditing ? "Click the camera icon to update your photo" : "Profile Picture"}
              </p>
              {errors.profileImage && <span className="error-message">{errors.profileImage}</span>}
            </motion.div>

            {/* Form Fields */}
            <motion.div
              className="profile-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Full Name */}
              <div className="form-group">
                <label className="form-label">
                  <User size={16} />
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className={`form-input ${errors.fullName ? "error" : ""}`}
                  disabled={!isEditing}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label className="form-label">
                  <Mail size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`form-input ${errors.email ? "error" : ""}`}
                  disabled={!isEditing}
                  placeholder="Enter your email address"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </motion.div>

            {/* Account Information */}
            <motion.div
              className="account-info-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="section-title">Account Information</h2>

              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label">
                    <Calendar size={16} />
                    Member Since
                  </div>
                  <div className="info-value">{profileData.memberSince}</div>
                </div>

                <div className="info-item">
                  <div className="info-label">
                    <Shield size={16} />
                    Account Status
                  </div>
                  <div className={`info-value status ${profileData.accountStatus.toLowerCase()}`}>
                    <span className="status-indicator"></span>
                    {profileData.accountStatus}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProfileModal
