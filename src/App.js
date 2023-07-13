import { Routes, Route, useLocation } from 'react-router-dom';
import AppBarMenu from './components/AppBarMenu';
import Login from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import YourAccountPage from './pages/YourAccountPage';


function App() {

  const location = useLocation();

  const authRoutes = ['/signin', '/signup', '/reset-password', '/confirm-email'];

  return (
    <>
      
      <AuthProvider>
      {!authRoutes.includes(location.pathname) && <AppBarMenu />}
        <Routes>
          <Route path='/signin' element={<Login />} />
          <Route path='/private' element={
            <PrivateRoute>
              <h1>Hi from Ohio!</h1>
            </PrivateRoute>} 
          />
          <Route path='/your-account' element={
            
              <YourAccountPage />
            
          } />

        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
