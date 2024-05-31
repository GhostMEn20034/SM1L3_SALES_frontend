import { Routes, Route, useLocation } from 'react-router-dom';
import AppBarMenu from './components/AppBarMenu';
import Login from './pages/Auth/LoginPage';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';

import PrivateRoute from './utils/PrivateRoute';
import ConfirmNewEmail from './components/Confirmation/ConfirmNewEmail';
import IndexPage from './pages/IndexPage';
import AccountRoutes from './routes/Accounts';
import AddressRoutes from './routes/Addresses';
import SignUpRoutes from './routes/SignUp';
import ResetPasswordRoutes from './routes/ResetPassword';
import CartRoutes from './routes/Carts';
import ProductRoutes from './routes/Products';
import DealRoutes from './routes/Deals';
import EventRoutes from './routes/Events';

function App() {

  const location = useLocation();

  const authRoutes = ['/signin', '/signup', '/signup/confirm', '/reset-password/request', '/reset-password/confirm', '/change-email/verify'];

  return (
    <>

      <AuthProvider>
        <UserProvider>
          {!authRoutes.includes(location.pathname) && <AppBarMenu />}
          <Routes>
            <Route path='/signin' element={<Login />} />
            <Route path='/your-account/*' element={<AccountRoutes />} />
            <Route path='/your-account/addresses/*' element={<AddressRoutes />} />
            <Route path='/signup/*' element={<SignUpRoutes />} />
            <Route path='/reset-password/*' element={<ResetPasswordRoutes />} />
            <Route path='/cart/*' element={<CartRoutes />} />
            <Route path='/deals/*' element={<DealRoutes />} />
            <Route path='/events/*' element={<EventRoutes />} />

            <Route path='/*' element={
              <ProductRoutes />
            } />
            <Route path='/change-email/verify' element={
              <PrivateRoute>
                <ConfirmNewEmail />
              </PrivateRoute>
            } />
            <Route path='/' element={
                <IndexPage />
            } />
            <Route path='/private' element={
              <PrivateRoute>
                <h1>Hi from Ohio!</h1>
              </PrivateRoute>}
            />
          </Routes>
        </UserProvider>
      </AuthProvider>
    </>
  );
}

export default App;
