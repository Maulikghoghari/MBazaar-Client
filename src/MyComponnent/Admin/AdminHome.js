import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import './Admin.css';

const AdminHome = ({ basePath = '/server' }) => {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoverIndexes, setHoverIndexes] = useState({});

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

  const handleImageHover = (productId, index) => {
    setHoverIndexes((prev) => ({ ...prev, [productId]: index }));
  };

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
          <div key={idx} className="admin-category-block">
            <h3 className="admin-category-title">{category} ({groupedByCategory[category].length})</h3>
            <Row>
              {groupedByCategory[category].map((item, i) => {
                const imageList = [
                  item.mainImage ? `${API_BASE_URL}/images/${item.category}/${item.mainImage}` : null,
                  item.subImage1 ? `${API_BASE_URL}/images/${item.category}/${item.subImage1}` : null,
                  item.subImage2 ? `${API_BASE_URL}/images/${item.category}/${item.subImage2}` : null,
                  item.subImage3 ? `${API_BASE_URL}/images/${item.category}/${item.subImage3}` : null,
                ].filter(Boolean);

                const currentImage = imageList[hoverIndexes[item._id] ?? 0] || imageList[0];

                return (
                  <Col key={item._id || i} md={4} lg={3} className="mb-4">
                    <Card
                      className="h-100 admin-product-card position-relative"
                      onMouseLeave={() => {
                        setHoverIndexes((prev) => ({ ...prev, [item._id]: 0 }));
                      }}
                    >
                      {item.isnew && (
                        <span className="badge bg-success position-absolute top-0 start-0 m-2">
                          New
                        </span>
                      )}
                      {item.hot && (
                        <span className="badge bg-danger position-absolute top-0 end-0 m-2">
                          Hot
                        </span>
                      )}
                      {item.bestOffer && (
                        <span className="badge bg-warning text-dark position-absolute bottom-0 end-0 m-2">
                          Best
                        </span>
                      )}

                      <div className="admin-card-img-container">
                        {currentImage ? (
                          <img
                            src={currentImage}
                            alt={item.title}
                            className="admin-card-img"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/200?text=No+Image';
                            }}
                          />
                        ) : (
                          <div className="text-muted d-flex align-items-center justify-content-center h-100">
                            No Image
                          </div>
                        )}

                        {imageList.length > 1 && (
                          <div className="admin-img-indicators">
                            {imageList.map((_, dotIdx) => (
                              <div
                                key={dotIdx}
                                className={`admin-img-dot ${
                                  (hoverIndexes[item._id] ?? 0) === dotIdx ? 'active' : ''
                                }`}
                                onMouseEnter={() => handleImageHover(item._id, dotIdx)}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      <Card.Body className="d-flex flex-column justify-content-between">
                        <div>
                          <Card.Title className="fs-6 fw-bold mb-1 text-truncate" title={item.title}>
                            {item.title}
                          </Card.Title>
                          <div className="mb-2">
                            <span
                              className="badge"
                              style={{
                                backgroundColor: item.instock ? '#d1e7dd' : '#f8d7da',
                                color: item.instock ? '#0f5132' : '#842029',
                              }}
                            >
                              {item.instock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </div>
                          <div>
                            <strong className="text-primary fs-5">₹{item.price}</strong>{' '}
                            {item.oldprice && (
                              <span className="text-muted text-decoration-line-through ms-2">
                                ₹{item.oldprice}
                              </span>
                            )}
                            {item.discount && (
                              <span className="text-success ms-2 fw-semibold">
                                {item.discount}% off
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          className="btn btn-outline-primary btn-sm w-100 mt-3"
                          onClick={() => history.push(`${basePath}/edit-product/${item._id}`)}
                        >
                          Edit Product
                        </button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        ))
      )}
    </Container>
  );
};

export default AdminHome;
