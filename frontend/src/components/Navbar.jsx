import { Link } from "react-router-dom"
import "../styles/navbar.css"
import logo from  "../images/logo.png"

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
       <img src={logo} alt="logo"  width="48" height="48" viewBox="0 0 48 48" fill="none"/>
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/about" className="nav-link">
          About Us
        </Link>
        <Link to="/services" className="nav-link">
          Services
        </Link>
        <Link to="/contact" className="nav-link">
          Contact Us
        </Link>
        <Link to="/gallery" className="nav-link">
          Gallery
        </Link>
      </div>

      <Link to="/signup" className="signup-button">
        Signup
      </Link>
    </nav>
  )
}

export default Navbar
