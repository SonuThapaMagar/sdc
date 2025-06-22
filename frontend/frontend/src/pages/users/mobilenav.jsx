
import { X, Home, Users, Settings, MessageCircle, ImageIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import "../../styles/mobilenav.css"

const MobileNav = ({ isOpen, onClose, profileImage }) => {
  const navItems = [
    { icon: Home, label: "Home", href: "#", active: true },
    { icon: Users, label: "About Us", href: "#" },
    { icon: Settings, label: "Services", href: "#" },
    { icon: MessageCircle, label: "Contact Us", href: "#" },
    { icon: ImageIcon, label: "Gallery", href: "#" },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="mobile-nav-overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Sidebar */}
          <motion.div
            className="mobile-nav-sidebar"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <motion.div
              className="mobile-nav-header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="mobile-nav-profile"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                }}
              >
                <img src={profileImage || "/placeholder.svg"} alt="Profile" />
              </motion.div>
              <motion.button
                className="mobile-nav-close"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>
            </motion.div>

            <motion.nav
              className="mobile-nav-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {navItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <motion.a
                    key={index}
                    href={item.href}
                    className={`mobile-nav-item ${item.active ? "active" : ""}`}
                    onClick={onClose}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.5 + index * 0.1,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <IconComponent size={20} className="mobile-nav-icon" />
                    </motion.div>
                    <span className="mobile-nav-label">{item.label}</span>
                  </motion.a>
                )
              })}
            </motion.nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileNav
