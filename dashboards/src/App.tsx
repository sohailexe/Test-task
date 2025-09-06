import { Routes, Route, Navigate } from 'react-router';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import NotFoundPage from './pages/NotFoundPage';
import { useAuth } from './store/authStore';
import AdminPage from './pages/admin';

// You'll need to create this component for authenticated users
// import DashboardPage from './pages/DashboardPage'; // or whatever your main page is

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Root route - redirect based on authentication */}
      <Route 
        path='/' 
        element={
          isAuthenticated ? (
            <Navigate to="/admin" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />

      {/* Public routes */}
      <Route 
        path='/login' 
        element={
          isAuthenticated ? (
            <Navigate to="/admin" replace />
          ) : (
            <LoginPage />
          )
        } 
      />
      
      <Route 
        path='/register' 
        element={
          isAuthenticated ? (
            <Navigate to="/admin" replace />
          ) : (
            <RegisterPage />
          )
        } 
      />

      {/* Protected routes */}
      <Route 
        path='/admin/*' 
        element={
          isAuthenticated ? (
          <AdminPage/>
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />

      {/* Catch-all route for unmatched paths */}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;