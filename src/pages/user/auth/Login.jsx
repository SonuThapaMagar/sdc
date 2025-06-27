import { Link, useNavigate } from 'react-router-dom';
import '../../../styles/login.css';
import img from '../../../images/login.png';
import '../../../styles/global.css';
import { useState } from 'react';
import api from '../../../api/api';
import { toast } from 'react-toastify';
import { useAuth } from '../pages/auth-provider';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    console.log('Login form submitted with data:', formData);

    try {
      const response = await api.post('/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      const { message, id, token, role } = response.data;
      setSuccess(message || 'Login successful!');
      console.log('User ID:', id, 'Role:', role);

      // Use AuthProvider's login function
      const userData = {
        id: id,
        role: role,
        fullName: response.data.fullName || "User",
        email: formData.email,
        profileImage: response.data.profileImage || "/placeholder.svg?height=40&width=40"
      };
      
      login(userData, token);

      // Role-based redirection
      setTimeout(() => {
        if (role === 'SUPERADMIN') navigate('/superadmin/dashboard');
        else if (role === 'ADMIN') navigate('/admin/dashboard');
        else if (role === 'USER') navigate('/user/dashboard');
      }, 2000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'An error occurred during login';
      setError(errorMessage);
      console.error('Error:', errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="page-container">
      <main className="main-content">
        <div className="illustration-container">
          <img src={img} alt="Pet care illustration" className="pet-illustration" />
        </div>
        <div className="form-container">
          <div className="form-card">
            <h4 className="title">FurEverHome</h4>
            <h2 className="form-title">Login</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && <p className="text-green-500 text-center mb-4">{success}</p>}
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input type="email" id="email" placeholder="Enter Your Email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password*</label>
                <input type="password" id="password" placeholder="Enter Your Password" value={formData.password} onChange={handleChange} required />
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
                Don't have Account? <Link to="/signup" className="form-link">Sign up Here</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;