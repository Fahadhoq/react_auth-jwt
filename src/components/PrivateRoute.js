
import { Navigate } from 'react-router-dom';
import { useAuth } from '../app/auth/contexts/AuthContext';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ element: Element }) {
  const { currentUser } = useAuth();
  const user = useSelector((state) => state.login.user);
  const jwt_access_token = localStorage.getItem('jwt_access_token');
  
  return user &&  user.length != 0 ? (
    <Element />
  ) : (
    <Navigate to="/login" />
  );
}