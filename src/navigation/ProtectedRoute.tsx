import type React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { hasPermission } from '@/utils/permissions';

import { ComponentLoading } from '../components/ui/LoadingSpinner';

interface prop {
  children: React.ReactNode;
  requiredPerm?: string | string[];
}

const ProtectedRoute = ({ children, requiredPerm }: prop) => {
  const { isAuthenticated, role, permissions, isLoading } = useAuth();

  if (isLoading || isLoading) {
    return <ComponentLoading size='lg' fullScreen={true} />;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to='/login' replace />;
  }

  if (requiredPerm && !hasPermission(permissions, requiredPerm)) {
    return <Navigate to='/dashboard' replace />;
  }

  // Render the protected component if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
