import React, { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import AdminNav from './AdminNav';
import AdminHome from './AdminHome';
import AdminManageProduct from './AdminManageProduct';
import AdminUsers from './AdminUsers';
import AdminLogin from './AdminLogin';
import './Admin.css';

const AdminRoot = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Determine base path based on whether user arrived via /server or /admin
  const basePath = location.pathname.startsWith('/server') ? '/server' : '/admin';

  useEffect(() => {
    const authStatus = localStorage.getItem('admin_auth');
    setIsAuthenticated(authStatus === 'true');
    setCheckingAuth(false);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    localStorage.removeItem('admin_email');
    setIsAuthenticated(false);
  };

  if (checkingAuth) {
    return null;
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} basePath={basePath} />;
  }

  return (
    <div className="admin-wrapper">
      <AdminNav basePath={basePath} onLogout={handleLogout} />
      <Switch>
        {/* Support both /server and /admin prefixes */}
        <Route exact path={['/server', '/admin']}>
          <AdminHome basePath={basePath} />
        </Route>

        <Route exact path={['/server/products', '/admin/products', '/server/add-product', '/admin/add-product']}>
          <AdminManageProduct basePath={basePath} />
        </Route>

        <Route exact path={['/server/edit-product/:id', '/admin/edit-product/:id']}>
          <AdminManageProduct basePath={basePath} />
        </Route>

        <Route exact path={['/server/users', '/admin/users', '/server/user', '/admin/user']}>
          <AdminUsers basePath={basePath} />
        </Route>

        {/* Fallback */}
        <Route path={['/server/*', '/admin/*']}>
          <AdminHome basePath={basePath} />
        </Route>
      </Switch>
    </div>
  );
};

export default AdminRoot;
