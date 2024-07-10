import { useEffect } from 'react';
import { useAuth } from '../Provider/AuthProvider'; // Ensure the path is correct
import { Navigate, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserPrivateRoute = () => {
    const { token, role } = useAuth();

    useEffect(() => {
        if (role !== 'user' && token) {
            toast.error("You can't access this page");
        }
    }, [role, token]);

    if (!token) {
        return <Navigate to="/login" />;
    } else if (role !== 'user') {
        return <Navigate to="/" />;
    } else {
        return (
            <>
                <ToastContainer />
                <Outlet />
            </>
        );
    }
};

export default UserPrivateRoute;
