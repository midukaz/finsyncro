import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import App from './App';
import authService from './services/authService';

// Componente para verificar se o usuário está autenticado
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = authService.isAuthenticated();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/*" 
        element={
          <PrivateRoute>
            <App />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
};

export default AppRoutes; 