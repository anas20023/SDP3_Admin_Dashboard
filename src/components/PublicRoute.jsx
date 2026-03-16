import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col justify-center items-center gap-2">
        <span className="loading loading-infinity loading-xl"></span>
        <p>Loading...</p>
      </div>
    );
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;
