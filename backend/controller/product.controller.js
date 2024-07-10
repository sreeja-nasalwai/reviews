const productmodel = require('../model/product.model');
const reviewModel = require('../model/review.model');
const cartModel = require('../model/cart.model');

async function addToCart(req, res) {
    const { userId, productId } = req.params;
   
    const quantity = 1;
    try {
        const product = await productmodel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (product.quantity < quantity) {
            return res.status(400).json({ message: "Out of Stock" });
        }
        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            cart = new cartModel({ userId, items: [] });
        }
        const cartIndex = cart.items.findIndex(item => item.productId === productId);
        if (cartIndex > -1) {
            cart.items[cartIndex].quantity += quantity;
            cart.items[cartIndex].price = cart.items[cartIndex].quantity * product.price;
        } else {
            cart.items.push({
                imageUrl: product.imageUrl,
                productId,
                productName: product.productName,
                quantity,
                price: product.price
            });
        }
        await cart.save();
        res.status(200).json({ message: "Product added to cart successfully" });
    } catch (err) {
        res.status(500).json({ message: "An error occurred while adding to the cart" });
    }
}

async function postProduct(req, res) {
    try {
        const { productId, imageUrl, productName, price, color, type, description, quantity } = req.body;
        const product = await productmodel.create({
            _id: productId, imageUrl, productName, price, color, type, description, quantity
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: "Product details invalid" });
    }
}

async function productEditData(req, res) {
    const { id } = req.params;
    try {
        const product = await productmodel.findById(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the product" });
    }
}

async function getProduct(req, res) {
    try {
        const products = await productmodel.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the products" });
    }
}

async function productEditSave(req, res) {
    const { id } = req.params;
    try {
        const product = await productmodel.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while saving the product" });
    }
}

async function productDelete(req, res) {
    const { id } = req.params;
    try {
        const product = await productmodel.findByIdAndDelete(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        } else {
            res.status(200).json({ message: `Product with id ${product._id} is deleted` });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while deleting the product" });
    }
}

async function getProductById(req, res) {
    const { productId } = req.params;
    try {
        const product = await productmodel.findById(productId);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the product" });
    }
}

async function postReview(req, res) {
    const {userId,id}=req.params
    //const userName = req.headers.username; // Assuming userName is passed as a header
    const { review } = req.body;

    const newReview = new reviewModel({
        productId: id,
        userId,
        //userName,
        review
    });

    try {
        const savedReview = await newReview.save();
        console.log("Review saved:", savedReview); // Log the saved review for debugging
        res.status(201).json(savedReview);
    } catch (err) {
        console.error("Error saving review:", err.message); // Log the error message for debugging
        res.status(400).json({ message: err.message });
    }
}

async function getReviews(req, res) {
    const { id } = req.params; // Product ID

    try {
        const reviews = await reviewModel.find({ productId: id });
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    addToCart,
    postProduct,
    getProduct,
    productEditData,
    productDelete,
    productEditSave,
    getProductById,
    getReviews,
    postReview
};
