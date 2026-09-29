import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './Admin.css';

const AdminLogin = ({ onLoginSuccess, basePath = '/server' }) => {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin@123');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Check credentials: admin@gmail.com and admin@123
    if (email.trim() === 'admin@gmail.com' && password === 'admin@123') {
      localStorage.setItem('admin_auth', 'true');
      localStorage.setItem('admin_email', 'admin@gmail.com');
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        history.push(basePath);
      }
    } else {
      setError('Invalid admin credentials! Please use admin@gmail.com and admin@123');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <span className="admin-login-badge">M-Bazaar Control Panel</span>
          <h2>Admin Sign In</h2>
          <p>Enter your administrator credentials to access the admin panel.</p>
        </div>

        <div className="admin-demo-creds">
          <div className="fw-bold mb-1">Default Admin Credentials:</div>
          <div>Email: <code>admin@gmail.com</code></div>
          <div>Password: <code>admin@123</code></div>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Admin Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <div className="input-group">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin@123"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100 py-2 fw-bold mb-3">
            Sign In to Admin Panel
          </Button>

          <div className="text-center">
            <button
              type="button"
              className="btn btn-link text-decoration-none"
              onClick={() => history.push('/')}
            >
              ← Back to Client Store
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AdminLogin;
