import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { lazy, Suspense } from "react"
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"
import Login from "./pages/Public/Login"
import { AuthProvider } from "./context/AuthContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"
import DashboardRouteLoader from "./components/common/DashboardRouteLoader"

const Dashboard = lazy(() => import("./pages/Private/Dashboard"))
const Analytics = lazy(() => import("./components/Analytics"))
const UserManage = lazy(() => import("./components/UserManage"))
const SubscriptionManage = lazy(() => import("./components/SubscriptionManage"))
const SuggestionManage = lazy(() => import("./components/SuggestionManage"))
const TransactionManage = lazy(() => import("./components/TransactionManage"))
const FeedbackManage = lazy(() => import("./components/FeedbackManage"))

const withDashboardLoader = (component) => (
  <Suspense fallback={<DashboardRouteLoader />}>
    {component}
  </Suspense>
)

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Private Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={withDashboardLoader(<Dashboard />)}>
                <Route index element={withDashboardLoader(<Analytics />)} />
                <Route path="users" element={withDashboardLoader(<UserManage />)} />
                <Route path="subscriptions" element={withDashboardLoader(<SubscriptionManage />)} />
                <Route path="suggestions" element={withDashboardLoader(<SuggestionManage />)} />
                <Route path="transactions" element={withDashboardLoader(<TransactionManage />)} />
                <Route path="feedbacks" element={withDashboardLoader(<FeedbackManage />)} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <VercelAnalytics />
    </BrowserRouter>
  )
}

export default App
