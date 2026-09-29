import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Admin.css';

const AdminNav = ({ basePath = '/server', onLogout }) => {
  const history = useHistory();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    localStorage.removeItem('admin_email');
    if (onLogout) {
      onLogout();
    } else {
      history.push(basePath);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="admin-navbar">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <Link to={basePath} className="navbar-brand">
            <span>M-Bazaar</span>
            <span className="badge-admin">Admin</span>
          </Link>
          <nav className="admin-nav-links d-none d-md-flex">
            <Link
              to={basePath}
              className={`admin-nav-link ${isActive(basePath) ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link
              to={`${basePath}/products`}
              className={`admin-nav-link ${isActive(`${basePath}/products`) ? 'active' : ''}`}
            >
              Manage Products
            </Link>
            <Link
              to={`${basePath}/users`}
              className={`admin-nav-link ${isActive(`${basePath}/users`) || isActive(`${basePath}/user`) ? 'active' : ''}`}
            >
              Registered Users
            </Link>
          </nav>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Link to="/" className="admin-btn-store">
            View Store ↗
          </Link>
          <button onClick={handleLogout} className="admin-btn-logout">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminNav;
