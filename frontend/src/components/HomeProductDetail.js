import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';
import OptionsComponent from './OptionsComponent';
import '../HomeProductDetails.css';

const HomeProductDetail = () => {
  const { id } = useParams();
  // const id=localStorage.getItem("userId");
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const uid = localStorage.getItem("userId");
  const username = localStorage.getItem('userName'); 
  const { setProductId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/admin/productEdit/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching the product details:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/signup/reviews/${uid}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching the reviews:', error);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = async (pid) => {
    try {
      if (uid === null) {
        toast.error("You must login");
        navigate('/login');
      } else {
        const response = await axios.post(`http://localhost:3002/home/${uid}/${pid}`);
        toast.success(response.data.message);
        if (response.data.message === "Out of Stock") navigate('/home');
        //fetchProductData();
      }
    } catch (error) {
      console.error("There was an error adding the product to the cart:", error);
    }
  };

  const handlePlaceOrder = async (pid) => {
    try {
      if (uid === null) {
        toast.error("You must login");
        navigate('/login');
      } else {
        const response = await axios.post(`http://localhost:3002/order/direct/${uid}/${pid}`);
        toast.success(response.data.message);
        if (response.data.message === "Out of stock") navigate('/home');
        else {
          setProductId(pid);
          //fetchProductData();
          navigate('/homeorder');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      if (uid === null) {
        toast.error("You must login");
        navigate('/login');
      } else {
        const response = await axios.post(`http://localhost:3002/signup/reviews/${uid}`, {
          userId: uid,
          //userName: username, 
          review: reviewText
        });
        toast.success("Review added successfully");
        setReviews([...reviews, response.data]);
        setReviewText('');
      }
    } catch (error) {
      console.error("There was an error adding the review:", error);
    }
  };

  return (
    <>
      <Container className="product-detail-container mt-5">
        <Row>
          <Col md={6}>
            <Card className="product-image-card">
              <Card.Img variant="top" src={product.imageUrl} className="product-image" />
            </Card>
          </Col>
          <Col md={6}>
            <Card className="product-info-card">
              <Card.Body>
                <center><h1><Card.Title className="product-title">{product.productName}</Card.Title></h1></center>
                <Card.Text className="product-price"><strong>Price:</strong> ${product.price}</Card.Text>
                <Card.Text className="product-color"><strong>Color:</strong> {product.color}</Card.Text>
                <Card.Text className="product-type"><strong>Type:</strong> {product.type}</Card.Text>
                <Card.Text className="product-description"><strong>Description:</strong> {product.description}</Card.Text>

                <div className="button-group">
                  <Button variant="none" className="add-to-cart-button button btn1" onClick={() => handleAddToCart(product._id)}>
                    Add to cart
                  </Button>
                  <Button variant="none" className="place-order-button button btn1" onClick={() => handlePlaceOrder(product._id)}>
                    Place order
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={12}>
            <h3>Reviews</h3>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <Card key={review._id} className="mb-3">
                  <Card.Body>
                    <Card.Text>{review.review}</Card.Text>
                    <small className="text-muted">- {review.userName}</small>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
            <Form onSubmit={handleAddReview} className="mt-4">
              <Form.Group controlId="reviewText">
                <Form.Label>Write a Review</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="mt-3">Submit Review</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomeProductDetail;
