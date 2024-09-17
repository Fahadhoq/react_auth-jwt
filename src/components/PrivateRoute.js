
import { Navigate } from 'react-router-dom';
import { useAuth } from '../app/auth/contexts/AuthContext';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ element: Element }) {
  const user = useSelector((state) => state.login.user);
  const jwt_access_token = localStorage.getItem('jwt_access_token');
  
  return jwt_access_token &&  jwt_access_token != null ? (
    <Element />
  ) : (
    <Navigate to="/login" />
  );
}