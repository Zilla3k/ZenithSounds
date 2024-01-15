import { Navigate, Outlet } from 'react-router-dom';
import { useContext, ReactNode } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Home } from '../pages/Home';

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = () => {
  const { logged } = useContext(AuthContext);

  if (!logged) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Home />
      <Outlet />
    </>
  );
};