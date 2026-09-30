import React, { useState } from 'react';
import { Formik, Field, Form,ErrorMessage } from 'formik';
import './Login.css';
import { useHistory } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import axios from 'axios';
import * as Yup from 'yup';
import { API_BASE_URL } from '../../config';

function Login() {

  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

   const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email or Username is required'),
    password: Yup.string()
      .required('Password is required'),
  });

  return (
    <div className="container my-5">
      <div className="row shadow p-4 rounded">
        {/* Login Form */}
        <div className="col-md-6 border-end pe-4">
          <h3 className="mb-4 fw-bold">LOGIN</h3>
          <Formik
            initialValues={{ email: '', password: '', remember: false }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              axios.post(`${API_BASE_URL}/login`, values)
                .then(function (response) {
                  console.log(response);
                  localStorage.setItem("token", response.data.token);
                  history.push('/');
                })
                .catch(function (error) {
                  console.log(error);
                })
            }}
          >
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Username or email address <span className="text-danger">*</span>
                </label>
                <Field name="email" type="text" className="form-control" placeholder="Enter email or username" />
                 <div className="text-danger"><ErrorMessage name="email" /></div>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <Field
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="Enter password"
                  />
                  <span
                    className="input-group-text"
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}><FaRegEye /></i>
                  </span>
                </div>
                   <div className="text-danger"><ErrorMessage name="password" /></div>
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-bold">Log In</button>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="form-check">
                  <Field type="checkbox" name="remember" className="form-check-input" id="remember" />
                  <label className="form-check-label" htmlFor="remember">Remember me</label>
                </div>
                <a href="#" className="text-primary text-decoration-none">Lost your password?</a>
              </div>
            </Form>
          </Formik>
        </div>

        {/* Register Info Box */}
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center text-center">
          <h3 className="fw-bold">Register</h3>
          <p className="text-muted px-3">
            Registering for this site allows you to access your order status and history.
            Just fill in the fields below, and we’ll get a new account set up for you in no time.
            We will only ask you for information necessary to make the purchase process faster and easier.
          </p>
          <button className="btn btn-primary border text-light mt-2" onClick={() => history.push("/signup")}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
