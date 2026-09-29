import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './Admin.css';

const AdminUsers = ({ basePath = '/server' }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:4001/admin/user-findall');
      setUsers(res.data.data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container className="admin-container">
      <div className="admin-page-header">
        <div>
          <h2>Registered Users</h2>
          <small className="text-muted">Total Users: {users.length}</small>
        </div>
        <div>
          <button
            className="admin-action-btn-secondary"
            onClick={() => history.push(basePath)}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      <div className="admin-table-card">
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Loading registered users...</p>
          </div>
        ) : (
          <div className="table-responsive">
            <Table striped bordered hover className="admin-table">
              <thead className="table-dark">
                <tr>
                  <th style={{ width: '80px' }}>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Created Date</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user._id || index}>
                      <td>{index + 1}</td>
                      <td className="fw-semibold">{user.username || '-'}</td>
                      <td>{user.email || '-'}</td>
                      <td>
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleString()
                          : '-'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-muted">
                      No registered users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </Container>
  );
};

export default AdminUsers;
