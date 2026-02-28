import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import AdminHome from './pages/admin/AdminHome';
import ClientDashboard from './pages/client/ClientDashboard';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requireAdmin && !isAdmin) return <Navigate to="/dashboard" replace />;

  return children;
};

function App() {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to={isAdmin ? '/admin' : '/dashboard'} />} />

        {/* Client Routes */}
        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <ClientDashboard />
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminHome />
          </ProtectedRoute>
        } />

        {/* Root Redirect */}
        <Route path="/" element={<Navigate to={isAuthenticated ? (isAdmin ? '/admin' : '/dashboard') : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
