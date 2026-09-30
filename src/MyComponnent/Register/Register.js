import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import './Register.css';
import { FaRegEye } from "react-icons/fa";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { API_BASE_URL } from '../../config';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  return (
    <div className="container my-5">
      <div className="row shadow p-4 rounded">
        {/* Register Form */}
        <div className="col-md-6 pe-3 border-end">
          <h3 className="mb-4 fw-bold">REGISTER</h3>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmpassword: ''
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              axios.post(`${API_BASE_URL}/signup`, values)
                .then(function (response) {
                  console.log(response);
                  localStorage.setItem("token", response.data.token);
                  history.push('/login');
                })
                .catch(function (error) {
                  console.log(error);
                })
            }}
          >
            <Form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username <span className="text-danger">*</span></label>
                <Field name="username" className="form-control" placeholder="Enter username" />
                <div className="text-danger"><ErrorMessage name="username" /></div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address <span className="text-danger">*</span></label>
                <Field name="email" type="email" className="form-control" placeholder="Enter email" />
                <div className="text-danger"><ErrorMessage name="email" /></div>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span></label>
                <div className="input-group">
                  <Field name="password" type={showPassword ? 'text' : 'password'} className="form-control" placeholder="Enter password" />
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

              <div className="mb-3">
                <label htmlFor="confirmpassword" className="form-label">Confirm Password <span className="text-danger">*</span></label>
                <div className="input-group">
                  <Field name="confirmpassword" type={showConfirmPassword ? 'text' : 'password'} className="form-control" placeholder="Enter ConfirmPassword" />
                  <span
                    className="input-group-text"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    style={{ cursor: 'pointer' }}
                  >
                    <FaRegEye />
                  </span>
                </div>
                <div className="text-danger"><ErrorMessage name="confirmpassword" /></div>
              </div>

              <button type="submit" className="btn btn-primary w-100">Register</button>
            </Form>
          </Formik>
        </div>

        {/* Login Side Info */}
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center text-center">
          <h3 className="fw-bold">LOGIN</h3>
          <p className="text-muted px-3">
            Registering for this site allows you to access your order status and history.
            Just fill in the fields and we’ll get a new account set up for you in no time.
            We only ask for information necessary to make the purchase process faster and easier.
          </p>
          <button className="btn btn-primary border text-light mt-2" onClick={() => history.push("/login")}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
