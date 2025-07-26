import { useState, useEffect } from 'react';
import '../../style/AdminAuth.css';
import { useNavigate } from 'react-router-dom';

export default function AdminAuth() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Form Data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    secretKey: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [resetEmail, setResetEmail] = useState('');

  useEffect(() => {
    const savedAdmin = localStorage.getItem('adminData');
    setIsRegistered(!!savedAdmin);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.secretKey !== 'ADMIN@123') {
      setError('Invalid Secret Key!');
      return;
    }
    localStorage.setItem('adminData', JSON.stringify(formData));
    alert('Admin Registered Successfully!');
    setIsRegistered(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    if (adminData && loginData.email === adminData.email && loginData.password === adminData.password) {
      localStorage.setItem('adminLoggedIn', true);
      navigate('/admin/dashboard');
    } else {
      setError('Invalid Email or Password');
    }
  };

  const handleResetPassword = () => {
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    if (adminData && resetEmail === adminData.email) {
      const newPass = prompt('Enter new password:');
      if (newPass) {
        adminData.password = newPass;
        localStorage.setItem('adminData', JSON.stringify(adminData));
        alert('Password reset successful!');
        setShowForgot(false);
      }
    } else {
      alert('Email not found!');
    }
  };

  return (
    <div className="admin-auth-container">
      <div className="auth-card">
        {!isRegistered ? (
          <>
            <h2>Admin Registration</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleRegister}>
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
              <input type="text" name="secretKey" placeholder="Secret Key (ADMIN@123)" value={formData.secretKey} onChange={handleChange} required />
              <button type="submit">Register</button>
            </form>
          </>
        ) : showForgot ? (
          <>
            <h2>Reset Password</h2>
            <input type="email" placeholder="Enter registered email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} />
            <button onClick={handleResetPassword}>Reset</button>
            <button onClick={() => setShowForgot(false)}>Back to Login</button>
          </>
        ) : (
          <>
            <h2>Admin Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
              <input type="email" placeholder="Email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} required />
              <input type="password" placeholder="Password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required />
              <button type="submit">Login</button>
            </form>
            <p className="forgot-link" onClick={() => setShowForgot(true)}>Forgot Password?</p>
          </>
        )}
      </div>
    </div>
  );
}
