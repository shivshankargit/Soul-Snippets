import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { VerifyEmail } from './pages/VerifyEmail'
import { Toaster } from "react-hot-toast";
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'
import { Dashboard } from './pages/Dashboard'
import { ForgotPassword } from './pages/ForgotPassword'
import { ResetPassword } from './pages/ResetPassword'
import { LoadingSpinner } from './components/LoadingSpinner'
import { Home } from './pages/Home'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if(!isAuthenticated){
    return <Navigate to="/signin" replace />
  }

  if (isAuthenticated && !user?.isVerified) {
    return <Navigate to="/verify-email" replace/>
  }
  return children;
}

const RedirectAuthenticatedUser = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();

  if(isAuthenticated && user?.isVerified) {
    return <Navigate to="/dashboard" replace />
  }

  return children;
}

function App() {
  const {isCheckingAuth, checkAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner/>

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        } />

        <Route path="/signup" element={
          <RedirectAuthenticatedUser>
            <Signup/>
          </RedirectAuthenticatedUser>
        } />

        <Route path="/signin" element={
          <RedirectAuthenticatedUser>
          <Signin />
        </RedirectAuthenticatedUser>
        } />

        <Route path ="/verify-email" element={<VerifyEmail/>}/>

        <Route path ="/forgot-password" element={
          <RedirectAuthenticatedUser>
            <ForgotPassword/>
        </RedirectAuthenticatedUser>
        }/>

        <Route path="/reset-password/:token" element={
          <RedirectAuthenticatedUser>
            <ResetPassword/>
          </RedirectAuthenticatedUser>
        }/>

        <Route path='*' element={<Navigate to='/' replace />} />

      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
