const express=require('express');
const jwt=require('jsonwebtoken');
const signModel=require('../model/signup.model');
const {saveUser,checkUser,updatePassword}=require('../controller/signup.controller')

const {getReviews,postReview}=require('../controller/product.controller')
const productModel=require('../model/product.model');
const cartModel=require('../model/cart.model');
const orderModel=require('../model/order.model');
const routes=express.Router();
routes.use(express.json());
routes.post('/',saveUser);
routes.post('/login',checkUser);
routes.put('/update',updatePassword);
routes.get('/reviews/:id',getReviews);
routes.post('/reviews/:id',postReview);

module.exports=routes;