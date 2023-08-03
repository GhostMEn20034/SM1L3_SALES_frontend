import { Routes, Route, useLocation } from 'react-router-dom';
import AppBarMenu from './components/AppBarMenu';
import Login from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import PrivateRoute from './utils/PrivateRoute';
import YourAccountPage from './pages/YourAccountPage';
import PersonalInfoPage from './pages/PersonalInfoPage';
import ChangePersonalInfoPage from './pages/ChangePersonalInfoPage';
import ConfirmNewEmail from './components/Confirmation/ConfirmNewEmail';
import ConfirmSignup from './components/Confirmation/SignupConfirmation';
import SignUpPage from './pages/SignupPage';
import { ResetPasswordEnterEmail } from './components/ResetPasswordComponents';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AddressesPage from './pages/AddressesPage';
import AddAddressPage from './pages/AddAddressPage';
import EditAddressPage from './pages/EditAddressPage';


function App() {

  const location = useLocation();

  const authRoutes = ['/signin', '/signup', '/confirm-signup', '/reset-password', '/reset-password/confirm', '/confirm-email', '/change-email/verify'];

  return (
    <>

      <AuthProvider>
        <UserProvider>
          {!authRoutes.includes(location.pathname) && <AppBarMenu />}
          <Routes>
            <Route path='/signin' element={<Login />} />
            <Route path='/private' element={
              <PrivateRoute>
                <h1>Hi from Ohio!</h1>
              </PrivateRoute>}
            />
            <Route path='/your-account' element={
              <PrivateRoute>
                <YourAccountPage />
              </PrivateRoute>
            } />
            <Route path='/your-account/personal-info' element={
              <PrivateRoute>
                <PersonalInfoPage />
              </PrivateRoute>
            } />
            <Route path='/your-account/personal-info/change' element={
              <PrivateRoute>
                <ChangePersonalInfoPage />
              </PrivateRoute>
            } />
            <Route path='/change-email/verify' element={
              <PrivateRoute>
                <ConfirmNewEmail />
              </PrivateRoute>
            } />
            <Route path='/signup' element={
              <SignUpPage />
            } />
            <Route path='/confirm-signup' element={
              <ConfirmSignup />
            } />
            <Route path='/reset-password' element={
              <ResetPasswordEnterEmail />
            } />
            <Route path='/reset-password/confirm' element={
              <ResetPasswordPage />
            } />

            <Route path='/your-account/addresses' element={
              <PrivateRoute>
                <AddressesPage />
              </PrivateRoute>
            } />
            <Route path='/your-account/addresses/add' element={
              <PrivateRoute>
                <AddAddressPage />
              </PrivateRoute>
            } />
            <Route path='/your-account/addresses/edit' element={
              <PrivateRoute>
                <EditAddressPage />
              </PrivateRoute>
            }/>
          </Routes>
        </UserProvider>
      </AuthProvider>
    </>
  );
}

export default App;
