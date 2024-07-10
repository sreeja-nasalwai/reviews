import { useAuth } from '../Provider/AuthProvider';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminPrivateRoute = () => {
    const { token, role } = useAuth();

    if (!token) {
        return <Navigate to="/login" />;
    } else if (role !== 'admin') {
        toast.error('You cannot access this page');
        return <Navigate to="/" />;
    } else {
        return <Outlet />;
    }
};

export default AdminPrivateRoute;
