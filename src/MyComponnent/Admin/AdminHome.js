import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Spinner, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import './Admin.css';

const AdminHome = ({ basePath = '/server' }) => {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/product-findall`);
      setProducts(res.data.data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const groupedByCategory = products.reduce((acc, product) => {
    const cat = product.category || 'Uncategorized';
    acc[cat] = acc[cat] || [];
    acc[cat].push(product);
    return acc;
  }, {});

  return (
    <Container className="admin-container">
      <div className="admin-page-header">
        <div>
          <h2>Admin Dashboard</h2>
          <small className="text-muted">Total Products: {products.length}</small>
        </div>
        <div className="d-flex gap-2">
          <button
            className="admin-action-btn"
            onClick={() => history.push(`${basePath}/products`)}
          >
            + Add New Product
          </button>
          <button
            className="admin-action-btn-secondary"
            onClick={() => history.push(`${basePath}/users`)}
          >
            User Details
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-5 bg-white rounded shadow-sm">
          <h4>No products found</h4>
          <p className="text-muted">Get started by creating your first product!</p>
          <button
            className="admin-action-btn"
            onClick={() => history.push(`${basePath}/products`)}
          >
            + Add New Product
          </button>
        </div>
      ) : (
        Object.keys(groupedByCategory).map((category, idx) => (
          <div key={idx} className="admin-category-block mb-5">
            <h3 className="admin-category-title mb-3">{category} ({groupedByCategory[category].length})</h3>
            <Table striped bordered hover responsive className="admin-product-table align-middle bg-white">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '80px' }}>Image</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Badges</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {groupedByCategory[category].map((item, i) => {
                  const mainImage = item.mainImage ? `${API_BASE_URL}/images/${item.category}/${item.mainImage}` : null;
                  
                  return (
                    <tr key={item._id || i}>
                      <td>
                        <div className="admin-table-img-container rounded overflow-hidden" style={{ width: '50px', height: '50px', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {mainImage ? (
                            <img
                              src={mainImage}
                              alt={item.title}
                              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/50?text=No+Image';
                              }}
                            />
                          ) : (
                            <small className="text-muted" style={{ fontSize: '0.65rem' }}>No Img</small>
                          )}
                        </div>
                      </td>
                      <td className="fw-bold">{item.title}</td>
                      <td>
                        <span
                          className="badge"
                          style={{
                            backgroundColor: item.instock ? '#d1e7dd' : '#f8d7da',
                            color: item.instock ? '#0f5132' : '#842029',
                          }}
                        >
                          {item.instock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td>
                        <strong className="text-primary">₹{item.price}</strong>
                        {item.oldprice && (
                          <div className="text-muted text-decoration-line-through" style={{ fontSize: '0.85em' }}>
                            ₹{item.oldprice}
                          </div>
                        )}
                      </td>
                      <td>
                        {item.discount ? <span className="text-success fw-semibold">{item.discount}% off</span> : <span className="text-muted">-</span>}
                      </td>
                      <td>
                        <div className="d-flex gap-1 flex-wrap">
                          {item.isnew && <span className="badge bg-success">New</span>}
                          {item.hot && <span className="badge bg-danger">Hot</span>}
                          {item.bestOffer && <span className="badge bg-warning text-dark">Best</span>}
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => history.push(`${basePath}/edit-product/${item._id}`)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        ))
      )}
    </Container>
  );
};

export default AdminHome;
