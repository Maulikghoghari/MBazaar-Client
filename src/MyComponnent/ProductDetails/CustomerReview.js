import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import { Progress } from 'antd';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';

function CustomerReview({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Current Product ID:", productId);

      const res = await axios.get(`http://localhost:4001/reviewsget/${productId}`, {
        headers: { token }
      });

      console.log("Raw Response:", res.data);

      const reviewData = Array.isArray(res.data.reviews) ? res.data.reviews : [];
      console.log("Fetched review data:", reviewData);

      setReviews(reviewData);

      const avg = reviewData.reduce((sum, r) => sum + r.rating, 0) / reviewData.length || 0;
      setAverageRating(avg.toFixed(1));

    } catch (err) {
      console.error("Error fetching reviews:", err);
      setReviews([]);
    }
  };




  useEffect(() => {
    fetchReviews();
  }, [productId]);


  const ratingCount = (star) => reviews.filter(r => r.rating === star).length;

  return (
    <div className="customer-review">
      <div className="container customer-review-container pb-5 pt-4">
        <div className="row">
          <div className="col-sm-6">
            <div className="ratting">
              <h3 className='customer-title'>Customer Reviews</h3>
              <div className="main-review text-center">
                <h2>{averageRating}</h2>
                <Rating name="read-only" value={parseFloat(averageRating)} precision={0.5} readOnly />
                <p>{reviews.length} review(s)</p>
              </div>
            </div>

            <div className="sub-review">
              {[5, 4, 3, 2, 1].map(star => (
                <div key={star} className="d-flex align-items-center">
                  <Rating name="read-only" value={star} readOnly />
                  <Progress
                    percent={(ratingCount(star) / (reviews?.length || 1)) * 100}
                    showInfo={false}
                    className='mx-2'
                  />
                  <p>{ratingCount(star)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-sm-6">
            <div className="review-container pt-4">
              <h4>Add a review</h4>
              <Formik
                initialValues={{
                  rating: 0,
                  review: '',
                  pros: '',
                  cons: '',
                }}
                onSubmit={async (values, { resetForm }) => {
                  let token = localStorage.getItem("token");

                  const dataToSend = {
                    ...values,
                    productId: productId
                  };

                  try {
                    const response = await axios.post(
                      `http://localhost:4001/reviewsadd/${productId}`,
                      dataToSend,
                      {
                        headers: { token: token }
                      }
                    );

                    console.log("Review added:", response.data);
                    fetchReviews();
                    resetForm();
                  } catch (error) {
                    console.error("Error submitting review:", error);
                  }
                }}
              >
                {({ values, setFieldValue }) => (
                  <Form className="review-form">
                    <div className="form-group">
                      <label>Your rating <span className="required">*</span>:</label>
                      <Rating
                        name="rating"
                        value={values.rating}
                        onChange={(e, val) => setFieldValue('rating', val)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="review">Your review <span className="required">*</span></label>
                      <Field as="textarea" id="review" name="review" rows="4" required />
                    </div>

                    <div className="form-group">
                      <label htmlFor="pros">Pros</label>
                      <Field id="pros" name="pros" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cons">Cons</label>
                      <Field id="cons" name="cons" />
                    </div>

                    <button type="submit" className="submit-btn">Submit</button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>

        {/* Display reviews */}
        {/* Display reviews in a scrollable container like Amazon */}
        <div className="pt-4">
          <h5>All Reviews</h5>
          <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
            {reviews.map((r, index) => (
              <div key={index} className="mb-3 border-bottom pb-2">
                <Rating value={r.rating} readOnly />
                <p className="mb-1"><strong>Pros:</strong> {r.pros}</p>
                <p className="mb-1"><strong>Cons:</strong> {r.cons}</p>
                <p>{r.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerReview;
