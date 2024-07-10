import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const uid = localStorage.getItem("userId");

const OptionsComponent = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const handleCartClick = () => {
        if (!token) {
            toast.error("You must login");
            navigate('/login');
        } else {
            navigate('/cart');
        }
    };

    const handleOrderClick = () => {
        if (!token) {
            toast.error("You must login");
            navigate('/login');
        } else {
            navigate('/order');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="container d-flex flex-wrap">
                <button
                    className='btn-color'
                    onClick={handleCartClick}
                    style={{ marginRight: '20px', color: 'purple', backgroundColor: 'white', border: 'white' }}
                >
                    <i className="fa-solid fa-cart-shopping"></i>Cart
                </button>
                <button
                    className='btn-color'
                    onClick={handleOrderClick}
                    style={{ height: '40px', color: 'purple', backgroundColor: 'white', border: 'white' }}
                >
                    <i className="bi bi-bag-fill"></i>My Orders
                </button>
            </div>
        </>
    );
};

export default OptionsComponent;
