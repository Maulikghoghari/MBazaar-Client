import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import './Admin.css';
import { Form, Button, Container, Row, Col, Table, Spinner, Image } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';

const categoryOptions = {
  "💻 Laptops": ["Apple MacBook", "Business Laptop", "Gaming Laptop", "Ultrabook"],
  "📱 Tablets": ["Apple Ipad", "Android tablets", "Windows Tablets"],
  "🖥️ PCs": ["Gaming PCs", "Office PCs", "All in one"],
  "🖵 Monitors": ["2K Monitors", "4K Monitors", "Curved Monitors", "Gaming Monitors"],
  "Printers": ["Printers & All-in-One", "Inkjet Printers", "Laser Printers", "Scanners"],
  "InputDevices": ["Mouse", "Keyboards", "Headsets", "Card readers"],
  "Components": ["Cases", "Processors", "Graphics Cards", "Motherboards", "Memory RAM", "PC Power Supply Unit", "SSD Drive", "HDD Drive"],
  "Cooling": ["CPU Fan", "Case Fan", "Thermal Paste"],
  "Hardware": ["Cables & Adapters", "WIFI Routers", "WIFI Sticks", "Disc Drives"],
  "MobilePhones": ["Apple iPhone", "Android Smartphone", "Button Mobile Phones"],
  "Wearables": ["Smart Watches", "Sport Watches"],
  "Accessories": ["Cases", "Powerbanks", "Watch Straps"],
  "Consoles": ["PlayStation Consoles", "Xbox Consoles", "Nintendo Consoles", "Consoles Games"],
  "PC_Gaming": ["PC Games", "Gamepads", "Wheels", "VR Headsets"],
  "TVS": ["8k TV", "4k TV", "OLED TV"],
  "HIFI": ["Turntables", "Amplifier", "HiFi Speakers"],
  "Cameras_Drones": ["DSLR", "Mirrorless", "Full Frame", "Drones"],
  "Kitchen": ["Dishwashers", "Fridges", "Ovens", "Blenders"],
  "Bathroom": ["Washing Machines", "Dryer", "All in one"],
  "Other": ["Vacuum Cleaners", "Irons", "Air conditioners"]
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  category: Yup.string().required('Category is required'),
  oldprice: Yup.string(),
  price: Yup.string().required('Price is required'),
  discount: Yup.string(),
});

const AdminManageProduct = ({ basePath = '/server' }) => {
  const history = useHistory();
  const { id } = useParams();

  const [editingProduct, setEditingProduct] = useState(null);
  const [initialFormValues, setInitialFormValues] = useState({
    title: '',
    category: '',
    oldprice: '',
    price: '',
    hot: false,
    isnew: false,
    instock: true,
    discount: '',
    newgood: false,
    bestoffer: false,
    mainImage: null,
    subImage1: null,
    subImage2: null,
    subImage3: null
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState({});

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/product-findall`);
      setProducts(res.data.data || []);
    } catch (err) {
      console.error('Fetch error:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setInitialFormValues({
      title: product.title || '',
      category: product.category || '',
      oldprice: product.oldprice || '',
      price: product.price || '',
      hot: !!product.hot,
      isnew: !!product.isnew,
      instock: product.instock !== undefined ? !!product.instock : true,
      discount: product.discount || '',
      newgood: !!product.newgood,
      bestoffer: !!(product.bestoffer || product.bestOffer),
      mainImage: product.mainImage || null,
      subImage1: product.subImage1 || null,
      subImage2: product.subImage2 || null,
      subImage3: product.subImage3 || null
    });

    const baseUrl = `${API_BASE_URL}/images/${product.category}`;
    setPreviews({
      mainImage: product.mainImage ? `${baseUrl}/${product.mainImage}` : null,
      subImage1: product.subImage1 ? `${baseUrl}/${product.subImage1}` : null,
      subImage2: product.subImage2 ? `${baseUrl}/${product.subImage2}` : null,
      subImage3: product.subImage3 ? `${baseUrl}/${product.subImage3}` : null
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (id) {
      const fetchById = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/admin/product-findone?id=${id}`);
          const product = res.data.data;
          if (Array.isArray(product) && product.length > 0) {
            handleEdit(product[0]);
          } else if (product && !Array.isArray(product)) {
            handleEdit(product);
          }
        } catch (err) {
          console.error('Failed to load product by ID:', err);
        }
      };
      fetchById();
    }
  }, [id]);

  const handleDelete = async (prodId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${API_BASE_URL}/admin/product-delete?id=${prodId}`);
        fetchProducts();
      } catch (err) {
        console.error('Error deleting product:', err);
        alert('Failed to delete product.');
      }
    }
  };

  const handleImagePreview = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setPreviews((prev) => ({ ...prev, [field]: URL.createObjectURL(file) }));
    }
  };

  const handleResetForm = () => {
    setEditingProduct(null);
    setInitialFormValues({
      title: '',
      category: '',
      oldprice: '',
      price: '',
      hot: false,
      isnew: false,
      instock: true,
      discount: '',
      newgood: false,
      bestoffer: false,
      mainImage: null,
      subImage1: null,
      subImage2: null,
      subImage3: null
    });
    setPreviews({});
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    const data = new FormData();

    Object.keys(values).forEach((key) => {
      if (key.includes('Image')) {
        if (values[key] instanceof File) {
          data.append(key, values[key]);
        } else if (typeof values[key] === 'string' && values[key]) {
          data.append(key + '_existing', values[key]);
        }
      } else {
        data.append(key, values[key]);
      }
    });

    try {
      if (editingProduct) {
        await axios.put(`${API_BASE_URL}/admin/product-update?id=${editingProduct._id}`, data);
        alert('Product updated successfully!');
      } else {
        await axios.post(`${API_BASE_URL}/admin/product-add`, data);
        alert('Product added successfully!');
      }

      handleResetForm();
      fetchProducts();
      resetForm();
    } catch (err) {
      console.error(err);
      alert('Error saving product.');
    }
    setLoading(false);
  };

  return (
    <Container className="admin-container">
      <div className="admin-page-header">
        <div>
          <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <small className="text-muted">
            {editingProduct ? `Editing ID: ${editingProduct._id}` : 'Create a new product listing'}
          </small>
        </div>
        <div className="d-flex gap-2">
          {editingProduct && (
            <button className="btn btn-outline-secondary" onClick={handleResetForm}>
              Cancel Edit
            </button>
          )}
          <button className="admin-action-btn-secondary" onClick={() => history.push(basePath)}>
            ← Back to Dashboard
          </button>
        </div>
      </div>

      <div className="admin-form-card">
        <h3>
          <span>{editingProduct ? 'Update Product Details' : 'Product Information'}</span>
        </h3>

        <Formik
          initialValues={initialFormValues}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, setFieldValue, values, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Title</Form.Label>
                    <Form.Control
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      placeholder="e.g. Apple MacBook Pro M3"
                      isInvalid={touched.title && !!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      isInvalid={touched.category && !!errors.category}
                    >
                      <option value="">-- Select Category --</option>
                      {Object.entries(categoryOptions).map(([groupTitle, options]) => (
                        <optgroup key={groupTitle} label={groupTitle}>
                          {options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </optgroup>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Old Price (₹)</Form.Label>
                    <Form.Control
                      name="oldprice"
                      type="number"
                      value={values.oldprice}
                      onChange={handleChange}
                      placeholder="e.g. 99999"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Price (₹)</Form.Label>
                    <Form.Control
                      name="price"
                      type="number"
                      value={values.price}
                      onChange={handleChange}
                      placeholder="e.g. 79999"
                      isInvalid={touched.price && !!errors.price}
                    />
                    <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3 align-items-center">
                <Col xs={6} md={2}>
                  <Form.Check
                    type="checkbox"
                    label="Hot"
                    name="hot"
                    checked={values.hot}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={6} md={2}>
                  <Form.Check
                    type="checkbox"
                    label="New"
                    name="isnew"
                    checked={values.isnew}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={6} md={2}>
                  <Form.Check
                    type="checkbox"
                    label="In Stock"
                    name="instock"
                    checked={values.instock}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={6} md={2}>
                  <Form.Check
                    type="checkbox"
                    label="New Good"
                    name="newgood"
                    checked={values.newgood}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={6} md={2}>
                  <Form.Check
                    type="checkbox"
                    label="Best Offer"
                    name="bestoffer"
                    checked={values.bestoffer}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={12} md={2} className="mt-2 mt-md-0">
                  <Form.Group>
                    <Form.Label className="fw-semibold mb-1">Discount %</Form.Label>
                    <Form.Control
                      name="discount"
                      type="number"
                      placeholder="10"
                      value={values.discount}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <hr className="my-4" />

              <h5 className="fw-bold mb-3">Product Images</h5>
              <Row>
                {['mainImage', 'subImage1', 'subImage2', 'subImage3'].map((field, idx) => (
                  <Col md={6} className="mb-3" key={idx}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">
                        {field === 'mainImage' ? 'Main Cover Image' : `Sub Image ${idx}`}
                      </Form.Label>
                      <div className="d-flex align-items-center gap-3">
                        <Form.Control
                          type="file"
                          name={field}
                          onChange={(e) => {
                            handleImagePreview(e, field);
                            setFieldValue(field, e.currentTarget.files[0]);
                          }}
                        />
                        {previews[field] && (
                          <Image
                            src={previews[field]}
                            className="admin-preview-img"
                            alt="preview"
                          />
                        )}
                      </div>
                    </Form.Group>
                  </Col>
                ))}
              </Row>

              <Button
                variant="primary"
                type="submit"
                size="lg"
                className="mt-3 px-4 fw-bold"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" /> Saving...
                  </>
                ) : editingProduct ? (
                  'Update Product'
                ) : (
                  '+ Add Product'
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="admin-table-card">
        <h4 className="fw-bold mb-3">All Products ({products.length})</h4>
        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" />
          </div>
        ) : (
          <div className="table-responsive">
            <Table striped bordered hover className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Old Price</th>
                  <th>Price</th>
                  <th>New</th>
                  <th>Hot</th>
                  <th>In Stock</th>
                  <th>Discount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(products) && products.length > 0 ? (
                  products.map((p) => (
                    <tr key={p._id}>
                      <td className="fw-semibold">{p.title}</td>
                      <td>{p.category}</td>
                      <td>{p.oldprice ? `₹${p.oldprice}` : '-'}</td>
                      <td className="fw-bold text-primary">₹{p.price}</td>
                      <td>{p.isnew ? '✔️' : '❌'}</td>
                      <td>{p.hot ? '✔️' : '❌'}</td>
                      <td>{p.instock ? '✔️' : '❌'}</td>
                      <td>{p.discount ? `${p.discount}%` : '-'}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleEdit(p)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(p._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-muted">
                      No products found.
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

export default AdminManageProduct;
