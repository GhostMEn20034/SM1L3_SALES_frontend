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
import CategoryRoutes from './routes/Categories';
import PaymentRoutes from './routes/Payments';
import OrderRoutes from './routes/Orders';
import OtherRoutes from './routes/Other';


function App() {

  const location = useLocation();

  const nonAppBarRoutes = [
    '/signin', '/signup', '/signup/confirm', '/reset-password/request', 
    '/reset-password/confirm', '/change-email/verify', '/orders/checkout',
  ];

  return (
    <>

      <AuthProvider>
        <UserProvider>
          {!nonAppBarRoutes.includes(location.pathname) && <AppBarMenu />}
          <Routes>
            <Route path='/signin' element={<Login />} />
            <Route path='/your-account/*' element={<AccountRoutes />} />
            <Route path='/your-account/addresses/*' element={<AddressRoutes />} />
            <Route path='/signup/*' element={<SignUpRoutes />} />
            <Route path='/reset-password/*' element={<ResetPasswordRoutes />} />
            <Route path='/cart/*' element={<CartRoutes />} />
            <Route path='/deals/*' element={<DealRoutes />} />
            <Route path='/events/*' element={<EventRoutes />} />
            <Route path='/categories/*' element={<CategoryRoutes />} />
            <Route path='/payments/*' element={<PaymentRoutes />} />
            <Route path='/orders/*' element={<OrderRoutes />} />
            <Route path='/op/*' element={<OtherRoutes />} />
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
          </Routes>
        </UserProvider>
      </AuthProvider>
    </>
  );
}

export default App;
