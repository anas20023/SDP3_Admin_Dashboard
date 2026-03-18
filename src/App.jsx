import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Public/Login"
import Dashboard from "./pages/Private/Dashboard"
import { ToastProvider } from "./context/ToastContext"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"
import UserManage from "./components/UserManage"
import SubscriptionManage from "./components/SubscriptionManage"
import SuggestionManage from "./components/SuggestionManage"
import Analytics from "./components/Analytics"
import TransactionManage from "./components/TransactionManage"
const App = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Private Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<Analytics/>} />
                <Route path="users" element={<UserManage/>} />
                <Route path="subscriptions" element={<SubscriptionManage/>} />
                <Route path="suggestions" element={<SuggestionManage/>} />
                <Route path="transactions" element={<TransactionManage/>} />
              </Route>
            </Route>

            {/* Fallback Routes */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
