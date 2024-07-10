import './App.css';
import LoginComponent from './components/LoginComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ProductComponent from './components/ProductComponent';
import SignUpComponent from './components/SignupComponent';
import HomeComponent from './components/HomeComponent';
import MainComponent from './components/MainComponent';
import CartComponent from './components/CartComponent';
import OrderComponent from './components/OrderComponent';
import HomeOrderComponent from './components/HomeOrderComponent';
import AuthProvider from './Provider/AuthProvider';
import CartOrderComponent from './components/CartOrderComponent';
import PaswordComponent from './components/PasswordComponent';
import PrivComponent from './components/PrivComponent';
import AdminPrivateRoute from './Routes/AdminPrivateRoute';
import ProductDetail from './components/ProductDetail';
import HomeProductDetail from './components/HomeProductDetail';
import UserPrivateRoute from './Routes/UserPrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HeaderComponent />
        <ToastContainer />
        <Routes>
          <Route path="/" exact element={<MainComponent />} />
          <Route path="/login" exact element={<LoginComponent />} />
          <Route path="/pass" exact element={<PaswordComponent />} />
          <Route path="/term" exact element={<PrivComponent />} />
          <Route path="/signup" exact element={<SignUpComponent />} />
          <Route path='/home' element={<HomeComponent />} />
          <Route element={<UserPrivateRoute />}>
            <Route path="/cart" exact element={<CartComponent />} />
            <Route path="/order" exact element={<OrderComponent />} />
            <Route path="/homeorder" exact element={<HomeOrderComponent />} />
            <Route path="/cartorder" exact element={<CartOrderComponent />} />
          </Route>
          <Route element={<AdminPrivateRoute />}>
            <Route path='/product' element={<ProductComponent />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Route>
          <Route path="/homeproduct/:id" exact element={<HomeProductDetail />} />
        </Routes>
      </AuthProvider>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
