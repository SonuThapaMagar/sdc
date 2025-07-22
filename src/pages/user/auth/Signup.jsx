import { Link, useNavigate } from 'react-router-dom';
import '../../../styles/signup.css';
import img2 from '../../../images/login.png';
import { useState, useEffect } from 'react';
import api from '../../../api/api';
import '../../../styles/global.css';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({});
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [e.target.id]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');

    // Field validation
    const newErrors = {};
    // Full Name required
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
      toast.error('Full Name is required');
    }
    // Address required
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      toast.error('Address is required');
    }
    // Phone validation (10-15 digits)
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      toast.error('Phone number is required');
    } else if (!/^\d{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Phone number must be 10-15 digits';
      toast.error('Phone number must be 10-15 digits');
    }
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      toast.error('Email is required');
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = 'Invalid email format';
      toast.error('Invalid email format');
    }
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      toast.error('Password is required');
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      toast.error('Password must be at least 8 characters');
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = 'Password must contain a lowercase letter';
      toast.error('Password must contain a lowercase letter');
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Password must contain an uppercase letter';
      toast.error('Password must contain an uppercase letter');
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain a number';
      toast.error('Password must contain a number');
    } else if (!/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(formData.password)) {
      newErrors.password = 'Password must contain a special character';
      toast.error('Password must contain a special character');
    }
    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
      toast.error('Confirm Password is required');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      toast.error('Passwords do not match');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await api.post('/api/auth/signup', {
        fullName: formData.fullName,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      });

      const { message, id } = response.data;
      setSuccess(message || 'Signup successful!');
      console.log('User ID:', id);

      // Clear existing tokens
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('superadminToken');

      toast.success('Signup successful! Please log in.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      const errorData = error.response?.data?.errors || { general: error.message || 'An error occurred during signup' };
      setErrors(errorData);
      Object.values(errorData).forEach((msg) => toast.error(msg));
      console.error('Error:', errorData);
    }
  };

  return (
    <div className="page-container">
      <main className="main-content">
        <div className="illustration-container">
          <img src={img2} alt="Pet care illustration" className="pet-illustration" />
        </div>
        <div className="form-container">
          <div className="form-card">
            <h2 className="form-title">Sign up</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name*</label>
                  <input type="text" id="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter Your Full Name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address*</label>
                  <input type="text" id="address" value={formData.address} onChange={handleChange} placeholder="Enter Your Address" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number*</label>
                  <input type="tel" id="phone" value={formData.phone} onChange={handleChange} placeholder="Enter Your Phone Number" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email*</label>
                  <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Email" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password*</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter Your Password"
                      required
                      style={{ paddingRight: '2rem' }}
                    />
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      style={{
                        position: 'absolute',
                        right: '0.5rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        userSelect: 'none',
                        fontSize: '1.2rem',
                      }}
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password*</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Enter Your Confirm Password"
                      required
                      style={{ paddingRight: '2rem' }}
                    />
                    <span
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      style={{
                        position: 'absolute',
                        right: '0.5rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        userSelect: 'none',
                        fontSize: '1.2rem',
                      }}
                      title={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
              </div>
              <button type="submit" className="submit-button">Sign Up</button>
            </form>
            <div className="form-footer">
              <p>
                Already Have an Account? <Link to="/login" className="form-link">Sign in Here</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Signup;